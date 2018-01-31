import { Meteor } from 'meteor/meteor';

Migrations.add({
  version: 3,
  up: function () {
    // Add studentTickets and nonStudentTickets counts to transaction docs.
    Gamestate.update({}, { $set: {
      sendReportsTo: ['kyle@kylerader.ninja', 'millie.johnson@wwu.edu'],
    }});
  },
  down: function () {
    // let's keep those.
  },
});
