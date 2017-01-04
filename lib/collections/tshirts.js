import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// User collection is already define by accounts-base package
Tshirts = new Meteor.Collection('tshirts');

// Ensure index
Meteor.startup(function () {
  if (Meteor.isServer) {
    Transactions._ensureIndex({ "email": 1, "transactionId": 1 });
  }
});
