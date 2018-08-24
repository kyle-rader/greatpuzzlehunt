import { Meteor } from 'meteor/meteor';
import { map, extend } from 'lodash';

import { PostRoute } from '../imports/route-types.js';
import processTransaction from '../imports/processTransaction.js';

// const { token } = Meteor.settings.accounts;
const accts = Meteor.settings.accounts || {};
const { token } = accts;

PostRoute.route('/api/tickets', function(params, req, res, next) {

  // Validate api token
  Meteor.logger.info(`Comparing token: ${token} with params.query.token: ${params.query.token}`);

  if (!params.query.token || params.query.token !== token) {
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
  processTransaction(req.body);
});
