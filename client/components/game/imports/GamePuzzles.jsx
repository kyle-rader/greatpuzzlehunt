import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Grid, Header } from 'semantic-ui-react';

import GamePuzzle from './GamePuzzle';

export default class GamePuzzles extends Component {
  render() {
    const { team } = this.props;
    return (
      <Grid.Row columns='1'>
        <Grid.Column>
          <Header as='h2' content='Your Puzzles'/>
          { this._renderPuzzles() }
        </Grid.Column>
      </Grid.Row>
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
