import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Header,
  Segment,
} from 'semantic-ui-react';

import AdminLeaderboardTracker from './imports/AdminLeaderboardTracker';
import AdminLeaderboardMain from './imports/AdminLeaderboardMain';

const thinSegmentStyle = {
  marginBottom: '-40px',
  paddingLeft: '28px',
};

AdminLeaderboard = class AdminLeaderboard extends Component {
  render() {
    const content = this._getContent();
    return (
      <Container fluid>
        <Segment basic style={thinSegmentStyle}>
          <Header as="h2" content="Admin Leader Board"/>
        </Segment>
        {content}
      </Container>
    );
  }

  _getContent() {
    const { ready, user, teams, users } = this.props;

    if (ready) {
      return <AdminLeaderboardMain user={user} users={users} teams={teams}/>;
    } else {
      return <Loading/>;
    }
  }
}

AdminLeaderboard.propTypes = {
  ready: PropTypes.bool.isRequired,
  user: PropTypes.object,
  users: PropTypes.arrayOf(Object),
  teams: PropTypes.arrayOf(Object),
};

AdminLeaderboard = AdminLeaderboardTracker(AdminLeaderboard);
