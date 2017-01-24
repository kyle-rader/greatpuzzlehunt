import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { isAdmin } from '../../lib/imports/method-helpers.js';

const FIND_LIMIT = 25;
const USER_FIELDS = {
  emails: 1,
  firstname: 1,
  lastname: 1,
  name: 1,
  roles: 1,
  updatedAt: 1,
  address: 1,
  city: 1,
  state: 1,
  zip: 1,
  age: 1,
  email: 1,
  name: 1,
  phone: 1,
  isAdult: 1,
  registrationType: 1,
  photoPermission: 1,
  legalGuardian: 1,
  teamId: 1,
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

  const user = Meteor.users.findOne({ _id: userId });
  if (!user) return this.ready();

  return Meteor.users.find({ teamId: user.teamId }, { fields: USER_FIELDS });
});

Meteor.publish('admin.users', function(page = 0) {
  check(page, Match.Integer);

  return isAdmin(this.userId) ? Meteor.users.find({ roles: { $ne: 'admin' } }, {
    limit: FIND_LIMIT,
    skip: FIND_LIMIT * page,
  }) : this.ready();
});
