import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { map, extend, omit } from 'lodash';
import crypto from 'crypto';

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

  return userId;
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
