import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Container } from 'semantic-ui-react';

MatchMaker = class MatchMaker extends Component {
  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Match Making' subtitle='Find a team or more players'/>
      </Container>
    );
  }
}
