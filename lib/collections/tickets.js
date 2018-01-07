import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

Tickets = new Meteor.Collection('tickets');

// Tickets.schema = new SimpleSchema({
//   tx: {type: String},
//   boughtBy: {type: String},
//   type: {type: String},
//   code: {type: String},
//   redeemed: {type: Boolean},
//   redeemedBy: {type: String},
// });

// Ensure index on ticket code
Meteor.startup(function () {
  if (Meteor.isServer) {
    Tickets._ensureIndex({ "code": 1 });
  }
});
