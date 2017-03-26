import { Meteor } from 'meteor/meteor';

import { isAdmin } from '../../lib/imports/method-helpers.js';

Meteor.publish('admin.images', function() {
  if (!isAdmin(this.userId)) return this.ready();
  return Images.find();
});
