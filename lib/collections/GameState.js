import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

GameState = new Meteor.Collection('gamestate');

// Always ensure there is a game state and if not, create the default game state ("PreGame" state)
Meteor.startup(() => {

    if (Meteor.isServer) {
        let gameState = GameState.findOne({});
        if (!gameState) {
            GameState.insert({
                registration: true,
                gameplay: false
            });
        }
    }
});

// Meteor.users.update({}, {$set: { "services.resume.loginTokens" : [] }});

function checkForAdmin() {
    if (!Meteor.userId) {
        throw new Meteor.Error(400, 'You must be logged in');
    }
    else if (Meteor.user().roles.indexOf('admin') < 0) {
        throw new Meteor.Error(400, 'You do not have permission to do that!');
    }
};

Meteor.methods({
    toggleRegistration() {
        checkForAdmin();

        let currentState = GameState.findOne({});
        GameState.update({_id: currentState._id}, {$set: {registration: !currentState.registration}});

    },

    toggleGameplay() {
        checkForAdmin();

        let currentState = GameState.findOne({});
        GameState.update({_id: currentState._id}, {$set: {gameplay: !currentState.gameplay}});

    }
});
