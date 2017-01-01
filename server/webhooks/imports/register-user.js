import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { map, extend, omit } from 'lodash';
import crypto from 'crypto';
import googleDistanceMatrix from 'google-distance-matrix';

export function registerUser(user, transaction) {
  const { firstname, lastname } = makeNames(user.name);
  const { email } = user;
  const userOptions = omit(user, ['email']);

  extend(userOptions, {
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

  // computeDistanceTraveled(userId, userOptions);

  return userId;
}

function computeDistanceTraveled(userId, { address, city, state, zip }) {
  const origins = ['48.7335, -122.4873'];
  const destinations = [`${address} ${zip}`];

  googleDistanceMatrix.matrix(origins, destinations, function (err, distances) {
    const distance = distances.rows[0].elements[0].distance.value
    Meteor.users.update({ _id: userId }, { $set: { distanceTraveled: distance } });
  })
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
