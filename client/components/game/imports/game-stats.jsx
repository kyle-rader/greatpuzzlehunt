import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Segment, Message, Statistic, Progress } from 'semantic-ui-react';

class GameStats extends Component {
  render() {
    const { team } = this.props;
    return (
      <Segment>
        Stats for { team.name }
      </Segment>
    );
  }
}

GameStats.propTypes = {
  team: PropTypes.object.isRequired,
};

export default GameStats;
