import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { groupBy } from 'lodash';

import {
  Segment,
} from 'semantic-ui-react';

class AdminLeaderboardMain extends Component {
  render() {
    const { teams, users } = this.props;
    return (
      <Segment>
        There are {teams.length} teams and {users.length} users
      </Segment>
    );
  }
}

AdminLeaderboardMain.propTypes = {
  users: PropTypes.arrayOf(Object).isRequired,
  teams: PropTypes.arrayOf(Object).isRequired,
};

export default AdminLeaderboardMain;
