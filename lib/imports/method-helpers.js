import { Meteor } from 'meteor/meteor';
import { Match, check } from 'meteor/check';

export function requireAdmin() {
  requireAccess('admin');
}

export function requireVolunteer() {
  requireAccess('volunteer');
}

function requireAccess(level) {
  const userId = Meteor.userId();
  if (!userId) {
    throw new Meteor.Error(400, 'You must be logged in');
  }

  const user = Meteor.users.findOne(userId);
  if (!user || !user.hasRole(level)) {
    throw new Meteor.Error(400, 'You do not have permission to do that!');
  }

  return true;
}

export function isAdmin(userId) {
  if (!userId) {
    return false;
  }

  const user = Meteor.users.findOne(userId);
  return user && user.hasRole('admin');
}

export function isVolunteer(userId) {
  if (!userId) {
    return false;
  }

  const user = Meteor.users.findOne(userId);
  return user && user.hasRole('volunteer');
}

export function checkMinLength(length) {
  return Match.Where((x) => {
    check(x, String);
    return x.length >= length;
  });
};

export const NonEmptyString = Match.Where(function (x) {
  check(x, String);
  return x.length > 0;
});

export function requirePattern(val, pattern, message) {
  const pass = Match.test(val, pattern);
  if (pass) return true;
  throw new Meteor.Error(400, message);
}

// This can only be used in Meteor Methods
export function requireUser() {
  if (!Meteor.userId()) {
    throw new Meteor.Error(403, 'You must be logged in');
  }
  return true;
}

export function notDuringGameplay() {
  const gamestate = Gamestate.findOne();
  if (gamestate.gameplay) {
    throw new Meteor.Error(400, "Sorry, you can't do that during Gameplay!");
  }
}

export function makeName(firstname, lastname) {
  const first = firstname || "";
  const last = lastname || "";
  return `${first.charAt(0).toUpperCase()}${first.slice(1)} ${last.charAt(0).toUpperCase()}${last.slice(1)}`;
}
