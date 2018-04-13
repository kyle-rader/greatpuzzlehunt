import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { groupBy } from 'lodash';

import {
  Container,
} from 'semantic-ui-react';

import AdminLeaderboardTracker from './imports/AdminLeaderboardTracker';
import AdminLeaderboardMain from './imports/AdminLeaderboardMain';

AdminLeaderboard = class AdminLeaderboard extends Component {
  render() {
    const content = this._getContent();
    return (
      <Container fluid>
        <PuzzlePageTitle title="Admin Leader Board"/>
        {content}
      </Container>
    );
  }

  _getContent() {
    const { ready, teams, users } = this.props;

    if (ready) {
      return <AdminLeaderboardMain users={users} teams={teams}/>;
    } else {
      return <Loading/>;
    }
  }
}

AdminLeaderboard.propTypes = {
  ready: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(Object),
  teams: PropTypes.arrayOf(Object),
};

AdminLeaderboard = AdminLeaderboardTracker(AdminLeaderboard);
