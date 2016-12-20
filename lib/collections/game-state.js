import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { requireAdmin } from '../imports/method-helpers.js';

GameState = new Meteor.Collection('gamestate');

Meteor.startup(() => {

  // Always ensure there is a game state and if not, create the default game state ("PreGame" state)
  if (Meteor.isServer) {
    let gameState = GameState.findOne({});
    if (!gameState) {
      GameState.insert({
        volunteerRegistration: false,
        playerRegistration: false,
        gameplay: false
      });
    }
  }
});

/*
 * Gamestate Methods:
 */
Meteor.methods({

  gamestateToggleVolunteerRegistration: function() {
    requireAdmin();
    let currentState = GameState.findOne({});
    GameState.update({ _id: currentState._id }, {
      $set: {
        volunteerRegistration: !currentState.volunteerRegistration
      }
    });
  },

  gamestateTogglePlayerRegistration: function() {
    requireAdmin();
    let currentState = GameState.findOne({});
    GameState.update({ _id: currentState._id }, {
      $set: {
        playerRegistration: !currentState.playerRegistration
      }
    });
  },

  gamestateToggleGameplay() {
    requireAdmin();
    let currentState = GameState.findOne({});
    GameState.update({ _id: currentState._id }, {
      $set: {
        gameplay: !currentState.gameplay
      }
    });
  }
});
