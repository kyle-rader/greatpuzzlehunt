import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Container, Form, Message, Header, Icon, Button } from 'semantic-ui-react';

TeamCreator = class TeamCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Create a Team'/>
      </Container>
    );
  }
}
