import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Header,
  Button,
  Icon,
  Message,
  Label,
} from 'semantic-ui-react';

import VolunteerTeamComp from './VolunteerTeamComp';

class VolunteerTeamCheckInMain extends Component {
  render() {
    const { teamId, ready, team, teamMembers } = this.props;
    if (!ready) return <Loading/>;
    if (ready && !team) return this._noTeam(teamId);

    return (
      <Grid>
        { this._header() }
        { this._members(teamMembers) }
      </Grid>
    );
  }

  _noTeam(teamId) {
    return <Message warning icon="warning" header="Oops, No team found" content={`There is no team with id: "${teamId}"`}/>
  }

  _header() {
    const { name } = this.props.team;
    return (
      <Grid.Row>
        <Grid.Column>
          <PuzzlePageTitle title="GPH 2018 Checkin" subTitle={name}/>
        </Grid.Column>
      </Grid.Row>
    );
  }

  _members(members) {
    return (
      <Grid.Row>
        <Grid.Column>
          <Header as="h3" content="Team Members"/>
          { members.map((member) => this._member(member)) }
        </Grid.Column>
      </Grid.Row>
    );
  }

  _member(member) {
    const success = member.paid && member.checkedIn;
    const warning = member.paid && !member.checkedIn;
    const failure = !member.paid; // or missing info
    const status = this._status(member);
    return (
      <Message positive={success} warning={warning} negative={failure} key={member._id}>
        <Message.Content>
          {member.name}
          <Label style={{float: 'right'}}>{status}</Label>
        </Message.Content>
      </Message>
    );
  }

  _status(member) {
    const { paid, checkedIn } = member;
    if (!paid) return "Needs Ticket!";
    else if (paid && !checkedIn) return "Not Here";
    else return "Ready to Play!";
  }
}

VolunteerTeamCheckInMain.propTypes = {
  teamId: PropTypes.string.isRequired,
  ready: PropTypes.bool.isRequired,
  team: PropTypes.object,
  teamMembers: PropTypes.arrayOf(Object),
};

export default VolunteerTeamComp(VolunteerTeamCheckInMain);
