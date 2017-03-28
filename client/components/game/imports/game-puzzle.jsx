import React, { Component, PropTypes } from 'react';

import ActivePuzzle from './active-puzzle';
import InactivePuzzle from './inactive-puzzle';

class GamePuzzle extends Component {
  render() {
    const { team, puzzle } = this.props;

    if (team.currentPuzzle === puzzle.puzzleId) {
      return <ActivePuzzle team={ team } puzzle={ puzzle } />
    } else {
      return <InactivePuzzle team={ team } puzzle={ puzzle } />
    }
  }
}

GamePuzzle.propTypes = {
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
};

export default GamePuzzle;
