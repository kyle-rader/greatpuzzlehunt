import { Meteor } from 'meteor/meteor';

Meteor.publish('gamestate', function() {
    return GameState.find({}, {
      volunteerRegistration: 1,
      playerRegistration: 1,
      gameplay: 1,
    });
});
