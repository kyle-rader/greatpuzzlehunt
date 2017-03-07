import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Container } from 'semantic-ui-react';

FindPeople = class FindPeople extends Component {
  render() {
    return (
      <Container>
        <PuzzlePageTitle title='People Looking for a Team'/>
      </Container>
    );
  }
}
