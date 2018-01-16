import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

GearOrders = new Meteor.Collection('gearOrders');

// Ensure index on ticket code
Meteor.startup(function () {
  if (Meteor.isServer) {
    Tickets._ensureIndex({ tx: 1, email: 1, itemcode: 1 });
  }
});
