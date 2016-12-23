import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Grid, Form, Icon } from 'semantic-ui-react';

TeamBrowser = class TeamBrowser extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Join a Team' />
      </Container>
    );
  }
}
