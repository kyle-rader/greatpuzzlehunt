import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Form } from 'semantic-ui-react';

AccountSetup = class AccountSetup extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
    <Container>
      <PuzzlePageTitle title="Account Setup"/>
    </Container>
    );
  }
}
