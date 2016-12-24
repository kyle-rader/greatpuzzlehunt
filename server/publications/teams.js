import { Meteor } from 'meteor/meteor';
import { isAdmin } from '../../lib/imports/method-helpers.js';

Meteor.publish('admin.teams', function() {
  return isAdmin() ? Teams.find({}) : this.ready();
});

Meteor.publish('teams.myTeam', function() {
  const { userId } = this.userId;

  if (!userId) {
    return this.ready();
  }

  const user = Meteor.users.findOne({ _id: userId });
  return Teams.find({ members: user.teamId });
});
