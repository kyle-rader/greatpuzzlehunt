import { Meteor } from 'meteor/meteor';
import { isAdmin, isVolunteer } from '../../lib/imports/method-helpers.js';

Meteor.publish('admin.teams', function() {
  return isAdmin(this.userId) ? Teams.find({}) : this.ready();
});

Meteor.publish('admin.teams.export', function() {
  if (!isAdmin(this.userId)) return this.ready();

  const users = Meteor.users.find({});
  const teams = Teams.find({});
  return [users, teams];
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

Meteor.publish('volunteer.team', function(teamId) {
  check(teamId, String);
  if (!isVolunteer(this.userId)) return this.ready();
  return Teams.find(teamId);
});

Meteor.publish('teams.browse', function() {
  return Teams.find({}, {
    fields: {
      name: 1,
      members: 1,
      updatedAt: 1,
      division:1,
      owner: 1,
      lookingForMembers: 1,
    },
  });
});
