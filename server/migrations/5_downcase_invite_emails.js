import { Meteor } from 'meteor/meteor';

Migrations.add({
  version: 5,
  up: function () {
    Invites.find({}).forEach((invite) => {
      Invites.update(invite._id, { $set: { email: invite.email.toLowerCase() } });
    });
  },
  down: function () {
    // let's keep it this way.
  },
});
