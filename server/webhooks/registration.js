import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const Post = Picker.filter((req, res) => (req.method === 'POST'));

Post.route('/tester', function(params, req, res, next) {

  Meteor.logger.info(`Request on route:`);

  Meteor.logger.info('params:');
  Meteor.logger.logobj(params);

  Meteor.logger.info('body:');
  Meteor.logger.logobj(req.body);

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify({ message: 'Hello routes' }));

});
