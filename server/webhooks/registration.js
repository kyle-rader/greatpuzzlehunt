import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email';

import { PostRoute } from '../post-route.js';

PostRoute.route('/api/register', function(params, req, res, next) {

  Meteor.logger.info(`Request on route:`);

  Email.send({
    to: ['kyle@kylerader.ninja', 'kyle-daling@live.com'],
    from: 'Great Puzzle Hunt API <info@greatpuzzlehunt.com>',
    subject: 'Registration API Hit',
    text: `Params:
${JSON.stringify(params, null, 2)}
body:
${JSON.stringify(req.body, null, 2)}`
  });

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end();

});
