import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import {
  Container,
  Header,
} from 'semantic-ui-react';

VolunteerCheckIn = class VolunteerCheckIn extends Component {
  render() {
    return (
      <Container>
        <Header as="h2" content="Check In Team:"/>
        Checking in Team with id <pre>{this.props.params.teamId}</pre>
      </Container>
    );
  }
}
