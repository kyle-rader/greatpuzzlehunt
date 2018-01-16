import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Transactions = new Meteor.Collection('transactions');

// Ensure index on ticket code
Meteor.startup(function () {
  if (Meteor.isServer) {
    Tickets._ensureIndex({ tx: 1, email: 1 });
  }
});
