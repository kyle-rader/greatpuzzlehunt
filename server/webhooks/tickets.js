import { Meteor } from 'meteor/meteor';
import { map, extend } from 'lodash';

import { PostRoute } from '../imports/route-types.js';
import processTransaction from '../imports/processTransaction.js';

PostRoute.route('/api/tickets', function(params, req, res, next) {

  // Validate api token
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
  processTransaction(req.body);
});
