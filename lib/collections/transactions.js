import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// User collection is already define by accounts-base package
Transactions = new Meteor.Collection('transactions');

// Ensure index
Meteor.startup(function () {
  if (Meteor.isServer) {
    Transactions._ensureIndex({ "transaction": 1 });
  }
});
