import { Meteor } from 'meteor/meteor';
import { isAdmin, isVolunteer } from '../../lib/imports/method-helpers.js';

Meteor.publish('admin.teams', function() {
  return isAdmin(this.userId) ? Teams.find({}) : this.ready();
});

Meteor.publish('admin.teams.export', function() {
  if (!isAdmin(this.userId)) return this.ready();

  const users = Meteor.users.find({ roles: { $nin: ['admin', 'volunteer'] } });
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

Meteor.publish('leaderboard', function() {
  const { userId } = this;
  const user = Meteor.users.findOne(userId);

  const query = {
    hasBegun: true,
    // $or: [
    //   { members: { $size: 4 } },
    //   { members: { $size: 5 } },
    //   { members: { $size: 6 } },
    // ],
  };
  const projection = {
    name: 1,
    members: 1,
    division: 1,
    finalScore: 1,
    'puzzles.start': 1,
    'puzzles.end': 1,
    'puzzles.hintsTaken': 1,
    'puzzles.score': 1,
    'puzzles.allowedTime': 1,
  };

  return Teams.find(query, { fields: projection });
});
