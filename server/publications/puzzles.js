import { Meteor } from 'meteor/meteor';
import { isAdmin, isVolunteer } from '../../lib/imports/method-helpers.js';

Meteor.publish('admin.puzzles', function() {
  if (!isAdmin(this.userId)) return this.ready();
  return Puzzles.find();
});

Meteor.publish('admin.leaderboard', function() {

  const USER_FIELDS = {
    checkedIn: 1,
    teamId: 1,
  };

  const TEAM_FIELDS = {
    name: 1,
    checkinConfirmed: 1,
    hasBegun:1,
    finalScore: 1,
    puzzles: 1,
    members: 1,
    division: 1,
  };

  // Return All Users and Teams that Checked In.
  return [
    Meteor.users.find({ checkedIn: true, teamId: { $ne: null } }, { fields: USER_FIELDS }),
    Teams.find({ hasBegun: true }, { fields: TEAM_FIELDS }),
  ];
});

Meteor.publish('volunteer.puzzles', function() {
  if (!isVolunteer(this.userId)) return this.ready();
  return [
    Puzzles.find({}, { fields: { location: 1, name: 1 } }),
    Gamestate.find({}),
  ];
});
