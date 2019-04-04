import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { requireAdmin } from '../imports/method-helpers.js';

Gamestate = new Meteor.Collection('gamestate');

Meteor.startup(() => {

  // Always ensure there is a game state and if not,
  // create the default game state ("PreGame" state)
  if (Meteor.isServer) {
    const gameState = Gamestate.findOne({});
    if (!gameState) {
      Gamestate.insert({
        gameplay: false,
        registration: true,
        leaderboard: false,
      });
    } else {
      // It exists check for sendReportsTo list
      if (!gameState.sendReportsTo) {
        Gamestate.update({_id: gameState._id}, { $set: { sendReportsTo: ["greatpuzzlehunt@gmail.com"]}});
      }
    }
  }
});

Meteor.methods({
  'admin.gamestate.toggleField'(field) {
    check(field, String);
    requireAdmin();
    const currentState = Gamestate.findOne({});
    Gamestate.update({ _id: currentState._id }, {
      $set: {
        [field]: !currentState[field],
      }
    });
  }
});
