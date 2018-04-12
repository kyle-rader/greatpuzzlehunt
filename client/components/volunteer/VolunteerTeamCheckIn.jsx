import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import {
  Container,
  Header,
  Button,
} from 'semantic-ui-react';

import VolunteerTeamCheckInMain from './imports/VolunteerTeamCheckInMain';

VolunteerTeamCheckIn = class VolunteerCheckIn extends Component {
  render() {
    const { teamId } = this.props.params;
    return (
      <Container>
        <VolunteerTeamCheckInMain teamId={teamId}/>
        <Button basic size='large' fluid color='violet' content='Close This Page' onClick={(e) => window.close()} />
      </Container>
    );
  }
}
