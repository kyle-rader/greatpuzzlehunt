import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { Button } from 'semantic-ui-react';

export default class GiveUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
        this._handleClick = this._handleClick.bind(this);
    }
    _handleClick(e){
        if(e.preventDefault) e.preventDefault();
        let didConfirm = confirm("Are you sure you want to end this puzzle and get the answer?");
        if(!didConfirm) return;

        let teamId = this.props.team._id;
        let puzzleId = this.props.puzzle.puzzleId;
        this.setState({loading: true});

        Meteor.call("team.puzzle.giveUp", puzzleId, teamId, (error, result)=>{
            if(error) alert(error);
            else{
                this.setState({loading: false});
            }
        });
    }

    _handleSubmit(e) {
        e.preventDefault();
        const { puzzle } = this.props;
        const { answer } = this.state;
    
        Meteor.call('team.puzzle.answer', puzzle.puzzleId, answer, (error, result) => {
          this.setState({ answer: '' });
          if (error) return this.setState({ error });
          if (result.message) {
            this.setState({ message: result.message });
            Meteor.setTimeout(() => this.setState({ message: null }), 2000);
          }
        });
      }
    


    render(){
        return (
            <Button fluid color='red' content='Get the Answer'
                disabled={this.state.loading} onClick={this._handleClick} />
        );
    }
}

GiveUp.propTypes = {
    team: PropTypes.object.isRequired,
    puzzle: PropTypes.object.isRequired,
};
  