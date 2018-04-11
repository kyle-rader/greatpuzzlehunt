import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Segment,
  List,
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
      <div>
        {this._header()}
        {this._itemsToGive(team, teamMembers)}
        {this._confirmButton(team)}
        {this._members(teamMembers)}
      </div>
    );
  }

  _noTeam(teamId) {
    return <Message warning icon="warning" header="Oops, No team found" content={`There is no team with id: "${teamId}"`}/>
  }

  _header() {
    const { name } = this.props.team;
    return <PuzzlePageTitle title="GPH 2018 Checkin" subTitle={name}/>;
  }

  _itemsToGive(team, teamMembers) {
    let noPhotoUsers = 0;
    let packets = 0;
    const { division } = team;

    console.log(teamMembers);
    teamMembers.forEach(member => {
      if (member.checkedIn) packets++;
      if (!member.photoPermission) noPhotoUsers++;
    });

    return (
      <Message info size="large">
        <Message.Header>Give to this team:</Message.Header>
        <Message.Content>
          <p></p>
          <List bulleted>
            <List.Item><b>{noPhotoUsers}</b> Anti-Photo Badges</List.Item>
            <List.Item><b>{packets}</b> Swag Bags</List.Item>
            <List.Item><b>{packets}</b> {division} Wrist Bands</List.Item>
          </List>
        </Message.Content>
      </Message>
    );
  }

  _members(members) {
    return (
      <Segment basic>
        <Header as="h3" content="Team Members"/>
        { members.map((member) => this._member(member)) }
      </Segment>
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
      <Segment basic>
        {content}
      </Segment>
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
