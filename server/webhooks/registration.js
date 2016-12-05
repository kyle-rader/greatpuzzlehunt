import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email';
import { map, extend } from 'lodash';

import { PostRoute } from '../imports/post-route.js';
import TransactionParser from './imports/transaction-parser.js';

PostRoute.route('/api/register', function(params, req, res, next) {

  // Validate access token
  if (!params.query.accessToken || params.query.accessToken !== Meteor.settings.accounts.registrationApiKey) {
    Meteor.logger.info(`Request on "/api/register" with bad accessToken: "${params.query.accessToken}" from ${Meteor.logger.jstring(req.headers)}`);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 400;
    res.write('{ error: \'Invalid accessToken\' }');
    return res.end();
  }

  Meteor.logger.info(`Request on "/api/register" (valid accessToken) from ${Meteor.logger.jstring(req.headers)}`);

  // Parse registration POST body
  const transaction = new TransactionParser(req.body);

  Meteor.logger.logobj(transaction);

  // Store original transaction:
  const txResult = Transactions.upsert({ _id: transaction._id }, { $set: transaction });

  if (process.env.NODE_ENV !== 'production' && txResult.numberAffected === 0) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    return res.end();
  }

  // Store T-Shirt Orders:
  map(transaction.tshirts, (tshirtOrder) => {
    Tshirts.insert(extend(tshirtOrder, {
      email: transaction.primaryContact.email,
      name: transaction.primaryContact.name,
    }));
  });

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end();

});
