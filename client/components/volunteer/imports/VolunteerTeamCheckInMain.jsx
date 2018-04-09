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
        {this._header()}
        {this._itemsToGive(teamMembers)}
        {this._members(teamMembers)}
        {this._confirmButton(team)}
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

  _itemsToGive(teamMembers) {
    let noPhotoUsers = 0;
    let packets = 0;

    console.log(teamMembers);
    teamMembers.forEach(member => {
      if (member.checkedIn) packets++;
      if (!member.photoPermission) noPhotoUsers++;
    });

    return (
      <Grid.Row>
        <Grid.Column>
          <Message info size="large">
            <Message.Header>Give to this team:</Message.Header>
            <Message.Content>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column width={12}>Anti-Photo Badges:</Grid.Column>
                  <Grid.Column width={4}><strong>{noPhotoUsers}</strong></Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column width={12}>Puzzle Bags/Packets:</Grid.Column>
                  <Grid.Column width={4}><strong>{packets}</strong></Grid.Column>
                </Grid.Row>
              </Grid>
            </Message.Content>
          </Message>
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

  _confirmButton(team) {
    const { checkinConfirmed: confirmed, name } = team;
    let content = <Button fluid size="large" color="green" content="Confirm Check In" onClick={() => this._confirmTeamCheckin(team)} />;
    if (confirmed) {
      content = <Message success header="Check In Confirmed!" content={`${name} is ready to play!`}/>
    }
    return (
      <Grid.Row>
        <Grid.Column>
          {content}
        </Grid.Column>
      </Grid.Row>
    );
  }

  _confirmTeamCheckin({_id: teamId, name}) {
    if (confirm(`Are you Sure?\nConfirm Check In for team: "${name}"?`)) {
      Meteor.call('team.checkin.confirm', teamId, (error, result) => {
        if (error) return alert(error.reason);
      });
    }
  }
}

VolunteerTeamCheckInMain.propTypes = {
  teamId: PropTypes.string.isRequired,
  ready: PropTypes.bool.isRequired,
  team: PropTypes.object,
  teamMembers: PropTypes.arrayOf(Object),
};

export default VolunteerTeamComp(VolunteerTeamCheckInMain);
