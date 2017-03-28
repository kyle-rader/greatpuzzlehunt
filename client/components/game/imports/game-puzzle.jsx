import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Segment, Header } from 'semantic-ui-react';

class GamePuzzle extends Component {
  render() {
    const { team, puzzle } = this.props;
    return (
      <Segment>
        <Header as='h4' content={ puzzle.name }/>
      </Segment>
    );
  }
}

GamePuzzle.propTypes = {
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
};

export default GamePuzzle;
