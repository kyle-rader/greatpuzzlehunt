import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Header,
  Segment,
  Message
} from 'semantic-ui-react';

import AdminLeaderboardTracker from './imports/AdminLeaderboardTracker';
import AdminLeaderboardMain from './imports/AdminLeaderboardMain';
import GamestateComp from '../../imports/GamestateComp';
import { isAdmin } from '../../../../lib/imports/method-helpers';

const thinSegmentStyle = {
  marginBottom: '-40px',
  paddingLeft: '28px',
};

AdminLeaderboard = class AdminLeaderboard extends Component {
  render() {
    const { teams, ready, gamestate, user } = this.props;
    const content = this._getContent();
    return (
      <Container fluid>
        <Segment basic style={thinSegmentStyle}>
          <Header as="h2" content="Leader Board"/>
          {ready && (user ? isAdmin(user._id) : false) ? <Message info header="Stats" content={`${teams.length} teams in play.`}/> : null}
          {content}
        </Segment>
      </Container>
    );
  }

  _getContent() {
    const { ready, user, teams, gamestate } = this.props;
    const isLeaderboardReady = ready ? gamestate.leaderboard : false;
    const userIsAdmin = ready && user ? isAdmin(user._id) : false;
    if (ready && (isLeaderboardReady || userIsAdmin)) {
      return <AdminLeaderboardMain user={user} teams={teams} />;
    } else if (ready && !userIsAdmin) {
      return <Message info content={'Leaderboard is not available yet.'} />;
    } else {
      return <Loading/>;
    }
  }
}

AdminLeaderboard.propTypes = {
  ready: PropTypes.bool.isRequired,
  user: PropTypes.object,
  teams: PropTypes.arrayOf(Object),
  gamestate: PropTypes.object,
};

AdminLeaderboard = AdminLeaderboardTracker(GamestateComp(AdminLeaderboard));
