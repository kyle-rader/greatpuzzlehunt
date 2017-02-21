import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Message } from 'semantic-ui-react';

PuzzleDashboard = class PuzzleDashboard extends Component {
  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Puzzles'/>
        <Message info content='Puzzle Editor coming soon...'/>
      </Container>
    );
  }
}
