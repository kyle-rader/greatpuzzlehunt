import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { isAdmin } from '../../lib/imports/method-helpers.js';

Meteor.publish('promo_codes', function() {
  if (isAdmin(this.userId)) {
    return PromoCodes.find({});
  }
  
  return this.ready();
});
