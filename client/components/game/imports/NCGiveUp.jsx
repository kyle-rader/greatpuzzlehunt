import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { Button, Confirm, Segment } from 'semantic-ui-react';

export default class GiveUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false,
            loading: false
        }
        this._handleClick = this._handleClick.bind(this);
    }

    _doGiveUp(){
        let teamId = this.props.team._id;
        let puzzleId = this.props.puzzle.puzzleId;
        this.setState({loading: true});

        Meteor.call("team.puzzle.giveUp", puzzleId, teamId, (error, result)=>{
            this.setState({loading: false});
            if(error) return alert(error.reason);
        });
    }

    _handleClick(e){
        if(e.preventDefault) e.preventDefault();
        this.setState({showConfirm: true});
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

      _confirmationModal(){
        let { showConfirm } = this.state;
        return (
          <Confirm
            open={showConfirm}
            header="Are you sure?"
            content={<Segment basic style={{fontSize: '16px'}}>
              <p>Are you sure you want to end this puzzle and get the answer?</p>
            </Segment>}
            confirmButton={`Yes, get the answer!`}
            cancelButton="Nevermind! We'll keep trying."
            onConfirm={() => {
                this.setState({showConfirm: false, division: "noncompetitive" })
                this._doGiveUp();
            }}
            onCancel={() => this.setState({showConfirm: false})}
            size="large"
          />
        );
      }

    render(){
        return (
            <div>
                { this._confirmationModal() }
                <Button fluid color='red' content='Get the Answer'
                    disabled={this.state.loading} onClick={this._handleClick} />
            </div>
        );
    }
}

GiveUp.propTypes = {
    team: PropTypes.object.isRequired,
    puzzle: PropTypes.object.isRequired,
};
  