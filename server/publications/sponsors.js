import { Meteor } from 'meteor/meteor';
import { isAdmin } from '../../lib/imports/method-helpers.js';

const SPONSOR_FIELDS = {
  name: 1,
  level: 1,
  publish: 1,
  logoUrl: 1,
  imageId: 1,
  createdAt: 1,
  updatedAt: 1,
};

Meteor.publish('admin.sponsors', function() {
  if (!isAdmin(this.userId)) {
    return this.ready();
  }

  return Sponsors.find({}, { fields: SPONSOR_FIELDS });
});

Meteor.publish('sponsors', function(level) {
  check(level, String);
  return Sponsors.find({ level, publish: true }, { fields: {
    level: 1,
    logoUrl: 1,
  }});
});
