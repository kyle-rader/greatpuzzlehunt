import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { map, extend, omit } from 'lodash';
import crypto from 'crypto';
import googleDistance from 'google-distance';

export function registerUser(user, transaction) {
  const { firstname, lastname } = makeNames(user.name);
  const { email } = user;

  const userOptions = extend(user, {
    transactionId: transaction._id,
    updatedAt: new Date(),
    roles: ['user'],
    firstname,
    lastname,
    username: makeUsername(user),
  });

  const userId = Accounts.createUser(userOptions);
  Accounts.addEmail(userId, email, true);
  Accounts.sendEnrollmentEmail(userId);

  Accounts.removeEmail(userId, email);

  computeDistanceTraveled(userId, userOptions);

  return userId;
}

function computeDistanceTraveled(userId, { address, city, state, zip }) {
  const origin = '48.7335, -122.4873';
  const destination = `${address} ${city}, ${state} ${zip}`;

  googleDistance.get({ origin, destination }, Meteor.bindEnvironment(function _getDistance(err, data) {
    if (err) {
      Meteor.logger.info(`Failed to get distance traveled for user ${userId}, coming from ${destination}`);
      Meteor.logger.info(err);
    }
    const traveled = !err && data.distanceValue ? data.distanceValue : -1;
    Meteor.users.update(userId, { $set: { traveled } });
  }));
}

export function makeNames(name) {
  const parts = map(name.match(/\S+/g), (part) => (part.charAt(0).toUpperCase() + part.slice(1)));
  return {
    firstname: parts[0] || '',
    lastname: parts[1] || '',
  };
}

export function makeUsername(user) {
  const salt = crypto.randomBytes(16).toString('base64');
  const name = user.name.replace(/\s/,'');
  return name + salt;
}
