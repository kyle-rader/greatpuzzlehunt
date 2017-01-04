import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Container, Grid, Form, Icon, Message } from 'semantic-ui-react';

TeamBrowser = class TeamBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Join a Team' />
        <Message info
          icon='configure'
          header='The team browser will be ready shortly!'
          content="If you want to join a friend's team, ask them to invite you using your account's email address"
        />

      </Container>
    );
  }
}
