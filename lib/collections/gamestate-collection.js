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
      });
    }
  }
});

Meteor.methods({
  'admin.gamestate.toggleGameplay'() {
    requireAdmin();
    const currentState = Gamestate.findOne({});
    Gamestate.update({ _id: currentState._id }, {
      $set: {
        gameplay: !currentState.gameplay
      }
    });
  },

  'admin.gamestate.toggleRegistration'() {
    requireAdmin();
    const currentState = Gamestate.findOne({});
    Gamestate.update({ _id: currentState._id }, {
      $set: {
        registration: !currentState.registration
      }
    });
  }
});
