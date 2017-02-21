import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Message } from 'semantic-ui-react';

Scoring = class Scoring extends Component {
  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Scoring'/>
        <Message info content='Scoring coming soon...'/>
      </Container>
    );
  }
}
