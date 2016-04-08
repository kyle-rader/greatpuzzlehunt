import { Meteor } from 'meteor/meteor';

Meteor.publish('gamestate', function() {

    if (!this.userId) return null;

    return GameState.find({});
});
