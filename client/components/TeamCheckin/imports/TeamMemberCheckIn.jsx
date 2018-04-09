import { meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Segment, Header, Grid, Icon, Button
} from 'semantic-ui-react';

class TeamMemeberCheckIn extends Component {
  render() {
    return (
      <Segment basic>
        <Header as="h2" content="Who is playing today?"/>
        <Grid relaxed divided='vertically'>
          {this._renderMembers()}
        </Grid>
      </Segment>
    );
  }

  _renderMembers() {
    const { teamMembers } = this.props;
    return teamMembers.map((member, i) => this._renderMember(member, i))
  }

  _renderMember(member, i) {
    const { name, paid, checkedIn, _id: userId } = member;
    return (
      <Grid.Row columns={3} key={userId}>
        <Grid.Column>
          <Icon name="ticket" color={paid ? 'green' : 'red'} size="large"/> {name}
        </Grid.Column>
        <Grid.Column>
          <Icon name={checkedIn ? "check" : "remove"} color={checkedIn ? 'green' : 'yellow'} size="large" /> {checkedIn ? "Ready" : "Not Here"}
        </Grid.Column>
        <Grid.Column>
          <Button basic={checkedIn} color={checkedIn ? "grey" : "green"} content={checkedIn ? "Cancel" : "Check In"} onClick={() => this._toggleCheckin(userId)}/>
        </Grid.Column>
      </Grid.Row>
    );
  }

  _toggleCheckin(userId) {
    Meteor.call('team.checkin.user', userId, (error, result) => {
      if (error) alert(error.reason);
    });
  }
}

TeamMemeberCheckIn.propTypes = {
  teamMembers: PropTypes.arrayOf(Object).isRequired,
};

export default TeamMemeberCheckIn;
