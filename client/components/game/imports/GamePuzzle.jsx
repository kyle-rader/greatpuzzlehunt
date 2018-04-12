import React, { Component, PropTypes } from 'react';

import ActivePuzzle from './ActivePuzzle';
import InactivePuzzle from './InactivePuzzle';

class GamePuzzle extends Component {
  render() {
    const { team, puzzle } = this.props;

    if (team.currentPuzzle === puzzle.puzzleId) {
      return <ActivePuzzle team={ team } puzzle={ puzzle } />
    } else {
      return <InactivePuzzle team={ team } puzzle={ puzzle } disabled={ Boolean(team.currentPuzzle) }/>
    }
  }
}

GamePuzzle.propTypes = {
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
};

export default GamePuzzle;
