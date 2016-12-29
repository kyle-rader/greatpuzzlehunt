import { Meteor } from 'meteor/meteor';
import { isAdmin } from '../../lib/imports/method-helpers.js';

Meteor.publish('admin.teams', function() {
  return isAdmin() ? Teams.find({}) : this.ready();
});

Meteor.publish('teams.myTeam', function() {
  const { userId } = this;

  if (!userId) {
    return this.ready();
  }

  return Teams.find({
    members: userId,
  });
});
