import React, { Component, PropTypes } from 'react';
import { Message, Button } from 'semantic-ui-react';

import ActivePuzzle from './ActivePuzzle';
import InactivePuzzle from './InactivePuzzle';

class VolunteerPuzzle extends Component {
  render() {
    const { volunteer, team, puzzle } = this.props;

    if (!volunteer.puzzleStation) {
      return <Message negative icon="warning" size="large" header="No Puzzle Station Set!" content="Close this page and Set your active Puzzle Station"/>
    }

    if (volunteer.puzzleStation !== puzzle.puzzleId) {
      const puzzleStationName = team.puzzles.find((p) => p.puzzleId === volunteer.puzzleStation).name;
      return (
        <Message negative size="large">
          <Message.Header>Puzzle Mis-Match!</Message.Header>
          <Message.Content>
            "{team.name}" wants to start <br/>{puzzle.name}<br/>
            <b>But</b>
            <br/>
            Your active puzzle station is <br/>{puzzleStationName}!
          </Message.Content>
        </Message>
      );
    }

    if (team.currentPuzzle === puzzle.puzzleId) {
      return <ActivePuzzle team={team} volunteer={volunteer} puzzle={puzzle}/>;
    } else {
      // If there is no current puzzle, the inactive puzzles should be enabled.
      const disabled = Boolean(team.currentPuzzle);
      return <InactivePuzzle team={team} volunteer={volunteer} puzzle={puzzle} disabled={disabled}/>;
    }
  }
}

VolunteerPuzzle.propTypes = {
  team: PropTypes.object.isRequired,
  volunteer: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
};

export default VolunteerPuzzle;
