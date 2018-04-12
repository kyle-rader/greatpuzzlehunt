import { Meteor } from 'meteor/meteor';
import { isAdmin, isVolunteer } from '../../lib/imports/method-helpers.js';

Meteor.publish('admin.puzzles', function() {
  if (!isAdmin(this.userId)) return this.ready();
  return Puzzles.find();
});

Meteor.publish('volunteer.puzzles', function() {
  if (!isVolunteer(this.userId)) return this.ready();
  return [
    Puzzles.find({}, { fields: { location: 1, name: 1 } }),
    Gamestate.find({}),
  ];
});
