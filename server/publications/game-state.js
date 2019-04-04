import { Meteor } from 'meteor/meteor';

Meteor.publish('gamestate', function() {
    return Gamestate.find({}, {
      registration: 1,
      gameplay: 1,
      leaderboard: 1,
      sendReportsTo: 1,
      checkin: 1,
    });
});
