import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { map, extend, omit } from 'lodash';
import crypto from 'crypto';

export function registerUser(user, transaction) {
  const { firstname, lastname, displayname } = makeNames(user.name);
  const { email } = user;
  const userOptions = omit(user, ['email']);

  extend(userOptions, {
    transactionId: transaction._id,
    updatedAt: new Date(),
    roles: ['user'],
    firstname,
    lastname,
    displayname,
    username: makeUsername(user),
  });

  const userId = Accounts.createUser(userOptions);
  Accounts.addEmail(userId, email, false);
  Accounts.sendEnrollmentEmail(userId);

  return userId;
}

export function makeNames(name) {
  const parts = name.match(/\S+/g);
  return {
    displayname: map(parts, (part) => (part.charAt(0).toUpperCase() + part.slice(1))).join(' '),
    firstname: parts[0],
    lastname: parts[1],
  };
}

export function makeUsername(user) {
  const salt = crypto.randomBytes(16).toString('base64');
  const name = user.name.replace(/\s/,'');
  return name + salt;
}
