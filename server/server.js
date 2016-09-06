import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import bodyParser from 'body-parser';

/************************************************
* Setup Winston Logger
************************************************/
const logger = require('winston');
logger.logobj = function logobj(obj, level) {
  level = level || 'info';
  logger[level](JSON.stringify(obj, null, 2));
};

Meteor.logger = logger;

/************************************************
* Add body parser
************************************************/
Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({ extended: false }));

require('./StartUp.js');
require('./Accounts.js');
