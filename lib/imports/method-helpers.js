import { Meteor } from 'meteor/meteor';
import { Match, check } from 'meteor/check';

export function requireAdmin() {
  const userId = Meteor.userId();
  if (!userId) {
    throw new Meteor.Error(400, 'You must be logged in');
  }

  const user = Meteor.users.findOne(userId);
  if (!user || user.roles.indexOf('admin') < 0) {
    throw new Meteor.Error(400, 'You do not have permission to do that!');
  }

  return true;
}

export function isAdmin() {
  const userId = Meteor.userId();
  if (!userId) {
    return false;
  }

  const user = Meteor.users.findOne(userId);
  return user && user.hasRole('admin');
}

export function checkMinLength(length) {
  return Match.Where((x) => {
    check(x, String);
    return x.length >= length;
  });
};

export function requireUser() {
  if (!Meteor.userId()) {
    throw new Meteor.Error(403, 'You must be logged in');
  }
  return true;
}
