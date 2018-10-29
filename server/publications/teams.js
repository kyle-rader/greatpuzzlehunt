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

  const user = Meteor.users.findOne(userId);
  if (!user) return this.ready();

  const userFields = {
    firstname: 1,
    lastname: 1,
    phone: 1,
    emails: 1,
    checkedIn: 1,
    paid: 1,
    teamId: 1,
  };

  return [
    Teams.find({ members: userId }),
    Meteor.users.find({ teamId: user.teamId }, { fields: userFields }),
  ];
});

Meteor.publish('volunteer.team', function(teamId) {
  check(teamId, String);
  if (!isVolunteer(this.userId)) return this.ready();

  return [
    Teams.find(teamId),
    Meteor.users.find({ teamId }),
  ];
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

Meteor.publish('game.progress', function() {
  const { userId } = this;
  const user = Meteor.users.findOne(userId);

  const teamQuery = {
    hasBegun: true,
  };
  const teamProjection = {
    name: 1,
    members: 1,
    division: 1,
    finalScore: 1,
    'puzzles.puzzleId': 1,
    'puzzles.name': 1,
    'puzzles.start': 1,
    'puzzles.end': 1,
    // 'puzzles.hintsTaken': 1,
    'puzzles.score': 1,
  };

  const puzzleProjection = {
    name: 1,
    allowedTime: 1,
    location: 1,
  };

  return [
    Teams.find(teamQuery, { fields: teamProjection }),
    Puzzles.find({}, { fields: puzzleProjection }),
  ];
});
