import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Segment, Message, Statistic, Progress } from 'semantic-ui-react';

class GamePuzzles extends Component {
  render() {
    const { team } = this.props;
    return (
      <Segment>
        Puzzles for { team.name }
      </Segment>
    );
  }
}

GamePuzzles.propTypes = {
  team: PropTypes.object.isRequired,
};

export default GamePuzzles;
