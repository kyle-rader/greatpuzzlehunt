import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { isAdmin } from '../../lib/imports/method-helpers.js';

const FIND_LIMIT = 25;
const USER_FIELDS = {
  emails: 1,
  firstname: 1,
  lastname: 1,
  roles: 1,
  updatedAt: 1,
  accountType: 1,
  teamId: 1,
  lookingForTeam: 1,
  bio: 1,
  photoPermission: 1,
  holdHarmless: 1,
  paid: 1,
  ticketUsed: 1,
};

Meteor.users.deny({
  update: () => {
    return true;
  }
});

Meteor.publish(null, function() {
  const { userId } = this;
  if (!userId) return this.ready();
  return Meteor.users.find({ _id: userId }, { fields: USER_FIELDS });
});

Meteor.publish('users.myTeam', function() {
  const { userId } = this;
  if (!userId) return this.ready();

  const user = Meteor.users.findOne(userId);
  if (!user) return this.ready();

  return Meteor.users.find({ teamId: user.teamId }, { fields: USER_FIELDS });
});

Meteor.publish('users.lookingForTeam', function() {
  const { userId } = this;
  if (!userId) return this.ready();

  return Meteor.users.find({ _id: { $ne: userId }, lookingForTeam: true, teamId: null, accountType: { $ne: 'VOLUNTEER' } }, { fields: {
    firstname: true,
    lastname: true,
    emails: true,
    bio: true,
    lookingForTeam: true,
  }});
});

Meteor.publish('admin.team.members', function(teamId) {
  check(teamId, String);
  if (!isAdmin(this.userId)) return this.ready();
  return Meteor.users.find({ teamId: teamId });
});

Meteor.publish('admin.users', function(search = null) {
  check(search, String);
  if (!isAdmin(this.userId)) return this.ready();

  const hasSearch = search && search.length > 0;

  const defaultSort = [
    ['createdAt', 'desc'],
    ['firstname', 'desc'],
  ];

  const options = {
    sort: defaultSort,
  };

  let query = {};
  if (hasSearch) {
    search = search.trim();
    query = {
      $or: [
        { 'firstname': { $regex: search, $options: 'i' } },
        { 'lastname': { $regex: search, $options: 'i' } },
        { 'emails': { $elemMatch: { address: { $regex: search, $options: 'i' } } } },
      ],
    };
  }

  const users = Meteor.users.find(query, options);
  const teams = Teams.find({});
  return [users, teams];
});
