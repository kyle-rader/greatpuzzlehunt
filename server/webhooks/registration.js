import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email';
import { map, extend } from 'lodash';

import { PostRoute } from '../imports/post-route.js';
import TransactionParser from './imports/transaction-parser.js';
import { registerUser } from './imports/register-user.js';

PostRoute.route('/api/register', function(params, req, res, next) {

  // Validate access token
  if (!params.query.accessToken || params.query.accessToken !== Meteor.settings.accounts.registrationApiKey) {
    Meteor.logger.info(`Request on "/api/register" with bad accessToken: "${params.query.accessToken}" from ${Meteor.logger.jstring(req.headers)}`);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 400;
    res.write('{ "error": "Invalid accessToken" }');
    return res.end();
  }

  // Validate Game State:
  const gamestate = Gamestate.findOne();
  if (!gamestate.registration) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 403;
    res.write('{"error: "Registration is closed" }');
    return res.send();
  }

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end();

  Meteor.logger.info(`Request on "/api/register" (valid accessToken) from ${Meteor.logger.jstring(req.headers)}`);

  // Parse registration POST body
  const transaction = new TransactionParser(req.body);

  // Store original transaction:
  const txResult = Transactions.upsert({ _id: transaction._id }, { $set: transaction });

  // Store T-Shirt Orders:
  const tshirts = map(transaction.tshirts, (tshirtOrder) => {
    return Tshirts.insert(extend(tshirtOrder, {
      email: transaction.primaryContact.email,
      name: transaction.primaryContact.name,
      transactionId: transaction._id,
    }));
  });

  // Create new users
  const usersIds = map(transaction.participants, (user) => registerUser(user, transaction));
  Transactions.update({ _id: transaction._id }, {
    $set: { usersIds },
  });

});
