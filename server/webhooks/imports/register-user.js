import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { map, extend, omit } from 'lodash';
import crypto from 'crypto';
import gmaps from 'google-distance-matrix';

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
  computeDistance(userId, userOptions);

  return userId;
}

function computeDistance(userId, { address, city, state, zip }) {
  const origins = ['48.7335, -122.4873'];
  const destinations = [`${address} ${zip}`];

  gmaps.matrix(origins, destinations, function (err, distances) {
    const distance = distances.rows[0].elements[0].distance.value
    Meteor.users.update({ _id: user._id }, { $set: { distanceTraveled: distance } });
  })
}

Meteor.methods({
  'test.distance'() {
    computeDistance('12345', { address: '23714 NE 61st St', city: 'redmond', state: 'WA', zip: '98053' });
  },
});

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
