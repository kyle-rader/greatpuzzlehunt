import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Container, Header } from 'semantic-ui-react';

class GamePuzzles extends Component {
  render() {
    const { team } = this.props;
    return (
      <Container fluid>
        <Header as='h2' content='Your Puzzles'/>
      </Container>
    );
  }
}

GamePuzzles.propTypes = {
  team: PropTypes.object.isRequired,
};

export default GamePuzzles;
