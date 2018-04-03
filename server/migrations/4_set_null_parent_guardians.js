import { Meteor } from 'meteor/meteor';

Migrations.add({
  version: 4,
  up: function () {
    // Add studentTickets and nonStudentTickets counts to transaction docs.
    Meteor.users.update(
      { parentGuardian: null },
      { $set: { parentGuardian: "" } },
      { multi: true }
    );
  },
  down: function () {
    // let's keep it this way.
  },
});
