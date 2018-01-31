import { Meteor } from 'meteor/meteor';

Meteor.publish('gamestate', function() {
    return Gamestate.find({}, {
      volunteerRegistration: 1,
      playerRegistration: 1,
      gameplay: 1,
      sendReportsTo: 1,
    });
});
