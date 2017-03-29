import React, { Component, PropTypes } from 'react';

import ActivePuzzle from './active-puzzle';
import InactivePuzzle from './inactive-puzzle';

class VolunteerPuzzle extends Component {
  render() {
    const { team, puzzle, targetPuzzle } = this.props;

    if (team.currentPuzzle === puzzle.puzzleId) {
      return <ActivePuzzle team={ team } puzzle={ puzzle } />
    } else {
      return <InactivePuzzle
        team={ team }
        puzzle={ puzzle }
        targetPuzzle={ targetPuzzle }
        disabled={ Boolean(team.currentPuzzle) }
      />
    }
  }
}

VolunteerPuzzle.propTypes = {
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
  targetPuzzle: PropTypes.string.isRequired,
};

export default VolunteerPuzzle;
