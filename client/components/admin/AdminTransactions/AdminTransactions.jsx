import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

AdminTransactions = class AdminTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  render() {
    return (
      <Container>
        <PuzzlePageTitle title="Admin: Transactions" />

      </Container>
    )
  }
}