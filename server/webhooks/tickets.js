import { Meteor } from 'meteor/meteor';
import { map, extend } from 'lodash';

import { PostRoute } from '../imports/post-route.js';
import { createTickets } from './imports/create-tickets.js';

PostRoute.route('/api/tickets', function(params, req, res, next) {

  // Validate access token
  if (!params.query.token || params.query.token !== Meteor.settings.accounts.apiKey) {
    Meteor.logger.info(`Request on "/api/tickets" with BAD TOKEN: "${params.query.token}" from ${Meteor.logger.jstring(req.headers)}`);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 403;
    res.write('{ "error": "Invalid token" }');
    return res.end();
  }

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end();

  Meteor.logger.info(`Request on "/api/tickets" from ${Meteor.logger.jstring(req.headers)}`);
  Meteor.logger.logobj(req.body);
  Meteor.logger.logobj(JSON.parse(req.body.gear));

  //
  // // Store T-Shirt Orders:
  // const tshirts = map(transaction.tshirts, (tshirtOrder) => {
  //   return Tshirts.insert(extend(tshirtOrder, {
  //     email: transaction.primaryContact.email,
  //     name: transaction.primaryContact.name,
  //     transactionId: transaction._id,
  //   }));
  // });
  //
  // // Create new users
  // const usersIds = map(transaction.participants, (user) => registerUser(user, transaction));
  // Transactions.update({ _id: transaction._id }, {
  //   $set: { usersIds },
  // });

});
