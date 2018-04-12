import { Meteor } from 'meteor/meteor';
import { withTracker} from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Segment,
  Header,
  Message,
  Button,
  Icon,
  Confirm,
} from 'semantic-ui-react';

function volunteerPuzzleComp(Comp) {
  return withTracker((props) => {
    const handle = Meteor.subscribe('volunteer.puzzles');
    const volunteer = Meteor.user();
    const ready = handle.ready();
    const puzzles = ready ? Puzzles.find({}).fetch() : [];
    const gamestate = ready ? Gamestate.findOne({}) : null;
    return {
      ready,
      volunteer,
      puzzles,
      gamestate,
    };
  })(Comp);
}

class VolunteerPuzzleSelectorInner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { ready, gamestate } = this.props;

    if (!ready) return this._renderMain(<Loading/>);

    if (!gamestate.gameplay) {
      return this._renderMain(this._waitingForGame());
    }

    return this._renderMain(this._renderPuzzles());
  }

  _renderMain(content) {
    return (
      <Segment basic>
        <Header as="h2" content="Puzzle Station Selection" />
        {content}
      </Segment>
    );
  }

  _waitingForGame() {
    return <Message info icon={<Icon name="refresh" loading/>} header="Waiting for Game" content="The game must start before you can select your puzzle station!"/>;
  }

  _renderPuzzles() {
    const { volunteer, puzzles } = this.props;
    return puzzles.map((p) => this._renderPuzzle(p, volunteer.puzzleStation === p._id));
  }

  _renderPuzzle(puzzle, active) {
    const confirmContent = (
      <Segment basic style={{fontSize: '16px'}}>
        Are you sure you want to set <br/><i>{puzzle.name}</i>,<br/>located at <br/><i>{puzzle.location}</i>,<br/> as your active puzzle station?
      </Segment>
    );
    return (
      <Message positive={active} size="large" key={puzzle._id} style={{overflow: 'auto'}}>
        <Message.Content>
          <Header as="h4" content={puzzle.name}/>
          {puzzle.location}
          <Button floated="right" color={active ? "grey" : "green"} disabled={active} content={active ? "Current" : "Set Active"} onClick={() => this.setState({ [puzzle._id]: true })}/>
          <Confirm
            open={this.state[puzzle._id]}
            header="Are you Sure?"
            cancelButton="Cancel"
            confirmButton="Yes do it!"
            content={confirmContent}
            onCancel={() => this.setState({ [puzzle._id]: false })}
            onConfirm={() => this._setActivePuzzleStation(puzzle._id)} />
        </Message.Content>
      </Message>
    );
  }

  _setActivePuzzleStation(puzzleId) {
    Meteor.call('volunteer.setPuzzleStation', puzzleId, (error, result) => {
      if (error) return alert(`Error! ${error.reason}`);
      this.setState({[puzzleId]: false });
    });
  }
}

export default volunteerPuzzleComp(VolunteerPuzzleSelectorInner);
