import React, { Component, PropTypes } from 'react';
import { Message, Button } from 'semantic-ui-react';

import ActivePuzzle from './active-puzzle';
import InactivePuzzle from './inactive-puzzle';

class VolunteerPuzzle extends Component {
  render() {
    const { volunteer, team, puzzle } = this.props;

    if (!volunteer.puzzleStation) {
      return <Message negative icon="warning" size="large" header="No Puzzle Station Set!" content="Close this page and Set your active Puzzle Station"/>
    }

    if (volunteer.puzzleStation !== puzzle.puzzleId) {
      const puzzleStationName = team.puzzles.find((p) => p.puzzleId === volunteer.puzzleStation).name;
      return (
        <Message negative icon="question" size="large">
          <Message.Header>Puzzle Mis-Match!</Message.Header>
          <Message.Content>
            {team.name} wants to start {puzzle.name}. <br/>
            <b>But</b><br/>
            Your active puzzle station is {puzzleStationName}!
          </Message.Content>
        </Message>
      );
    }

    if (team.currentPuzzle === puzzle.puzzleId) {
      return <ActivePuzzle team={ team } puzzle={ puzzle }/>;
    } else {
      return <InactivePuzzle team={ team } puzzle={ puzzle }/>;
    }
  }
}

VolunteerPuzzle.propTypes = {
  volunteer: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
};

export default VolunteerPuzzle;
