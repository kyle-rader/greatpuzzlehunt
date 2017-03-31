import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { PropTypes } from 'react';
import { sortBy } from 'lodash';

import TeamsExporter from './imports/teams-exporter';

class TeamsExportInner extends React.Component {
  render() {
    const { ready, teams } = this.props;
    if (ready) return <TeamsExporter teams={ teams }/>;
    else return <Loading />;
  }
}

TeamsExportInner.propTypes = {
  ready: PropTypes.bool.isRequired,
  teams: PropTypes.array,
};

TeamsExport = createContainer(() => {
  const handle = Meteor.subscribe('admin.teams.export');
  const ready = handle.ready();

  if (!ready) return { ready, teams: [] };

  // 1. Make team map.
  const teams = Teams.find({}).fetch().reduce((acc, t) => {
    acc[t._id] = t;
    acc[t._id].members = [];
    return acc;
  }, {});

  // no team entry:
  teams['zz_no_team'] = {
    members: [],
    name: 'zz_no_team',
    division: 'zz_no_division',
  };

  // 2. Add users to teams.
  const users = Meteor.users.find({}).fetch().forEach((u) => {
    const teamKey = u.teamId || 'zz_no_team';
    teams[teamKey].members.push(u);
  });

  return {
    ready,
    teams: sortBy(teams, ['division', 'name']),
  };
}, TeamsExportInner);
