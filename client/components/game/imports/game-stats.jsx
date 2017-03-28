import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Container, Segment, Header, Statistic, Progress } from 'semantic-ui-react';

class GameStats extends Component {
  render() {
    const { team } = this.props;
    return (
      <Container fluid>
        <Header as='h2' content='Your Stats'/>
      </Container>
    );
  }
}

GameStats.propTypes = {
  team: PropTypes.object.isRequired,
};

export default GameStats;
