import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email';

import { PostRoute } from '../imports/post-route.js';
import RegistrationParser from './imports/registration-parser.js';

PostRoute.route('/api/register', function(params, req, res, next) {

  if (!params.query.accessToken || params.query.accessToken !== Meteor.settings.accounts.registrationApiKey) {
    Meteor.logger.info(`Request on "/api/register" with bad accessToken: "${params.query.accessToken}" from ${Meteor.logger.jstring(req.headers)}`);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 400;
    res.write('{ error: \'Invalid accessToken\' }');
    return res.end();
  }

  Meteor.logger.info(`Request on "/api/register" (valid accessToken) from ${Meteor.logger.jstring(req.headers)}`);
  // const registration = new RegistrationParser(res.body);

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end();

});
