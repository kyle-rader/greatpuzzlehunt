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

const thinSegmentStyle = {
  marginBottom: '-40px',
  paddingLeft: '28px',
};

AdminLeaderboard = class AdminLeaderboard extends Component {
  render() {
    const { teams } = this.props;
    const content = this._getContent();
    return (
      <Container fluid>
        <Segment basic style={thinSegmentStyle}>
          <Header as="h2" content="Admin Leader Board"/>
          <Message info header="Stats" content={`There are ${teams.length} in play.`}/>
        </Segment>
        {content}
      </Container>
    );
  }

  _getContent() {
    const { ready, user, teams } = this.props;

    if (ready) {
      return <AdminLeaderboardMain user={user} teams={teams} />;
    } else {
      return <Loading/>;
    }
  }
}

AdminLeaderboard.propTypes = {
  ready: PropTypes.bool.isRequired,
  user: PropTypes.object,
  teams: PropTypes.arrayOf(Object),
};

AdminLeaderboard = AdminLeaderboardTracker(AdminLeaderboard);
