import { Meteor } from 'meteor/meteor';

Migrations.add({
  version: 1,
  up: function() {
    // Currently Ticket.boughtBy is the redeemedBy user._id
    // boughtBy should
    // User has ticketUsed as ticket._id
    Meteor.users.find({ ticketUsed: { $ne: null }}).forEach((user) => {
      const ticket = Tickets.findOne({ _id: user.ticketUsed });
      const tx = Transactions.findOne({ tx: ticket.tx });

      // Fix boughtBy <-> redeemedBy on the Ticket
      Tickets.update({ _id: ticket._id }, { $set: {
        redeemedBy: user.getEmail(),
        boughtBy: tx.email,
      }});

      // Fix the ticketUsed to the actual code of the Ticket.
      Meteor.users.update({ _id: user._id }, { $set: {
        ticketUsed: ticket.code,
      }});

    });
  },
  down: function() {
  },
});
