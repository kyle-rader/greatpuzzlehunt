import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const logger = require('winston');
logger.logobj = function logobj(obj, level) {
  level = level || 'info';
  logger[level](JSON.stringify(obj, null, 2));
};

Meteor.logger = logger;

require('./StartUp.js');
require('./Accounts.js');
