import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import {
  Container,
  Header,
} from 'semantic-ui-react';

import VolunteerTeamCheckInMain from './imports/VolunteerTeamCheckInMain';

VolunteerTeamCheckIn = class VolunteerCheckIn extends Component {
  render() {
    const { teamId } = this.props.params;
    return (
      <Container>
        <VolunteerTeamCheckInMain teamId={teamId}/>
      </Container>
    );
  }
}
