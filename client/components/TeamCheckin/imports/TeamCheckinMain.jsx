import { meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Segment, Header, Icon, Button, Message
} from 'semantic-ui-react';

import TeamComp from '../../imports/TeamComp';

import PreUserCheckin from './PreUserCheckin';
import PostUserCheckin from './PostUserCheckin';

class TeamCheckinMain extends Component {
  render() {
    const { ready, user, team, teamMembers } = this.props;

    if (!ready) return <Loading/>;

    if (!user.teamId && !team) {
      return (
        <Message icon="warning" size="large" warning header="Team required!" content="You must be on a team in order to check in!" />
      );
    }

    return (
      <div>
        <Header as="h2" content={team.name}/>
        {
          team.userCheckedIn ?
          <PostUserCheckin user={user} team={team} teamMembers={teamMembers}/> :
          <PreUserCheckin user={user} team={team}/>
        }
      </div>
    );
  }
}

TeamCheckinMain.propTypes = {
  ready: PropTypes.bool.isRequired,
  user: PropTypes.object,
  team: PropTypes.object,
  teamMembers: PropTypes.arrayOf(Object),
};

export default TeamComp(TeamCheckinMain);
