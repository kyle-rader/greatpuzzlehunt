import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Message } from 'semantic-ui-react';

GameState = class GameState extends Component {
  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Game Control'/>
        <Message info content='Game State controls coming soon...'/>
      </Container>
    );
  }
}
