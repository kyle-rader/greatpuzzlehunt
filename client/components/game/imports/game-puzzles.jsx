import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Container, Header } from 'semantic-ui-react';

import GamePuzzle from './game-puzzle';

class GamePuzzles extends Component {
  render() {
    const { team } = this.props;
    return (
      <Container fluid>
        <Header as='h2' content='Your Puzzles'/>
        { this._renderPuzzles() }
      </Container>
    );
  }

  _renderPuzzles() {
    const { team } = this.props;
    return team.puzzles.map((puzzle) => <GamePuzzle
      team={ team }
      puzzle={ puzzle }
      key={ puzzle.puzzleId }
    />);
  }
}

GamePuzzles.propTypes = {
  team: PropTypes.object.isRequired,
};

export default GamePuzzles;
