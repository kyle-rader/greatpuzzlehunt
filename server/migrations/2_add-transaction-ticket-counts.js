import { Meteor } from 'meteor/meteor';

Migrations.add({
  version: 2,
  up: function () {
    // Add studentTickets and nonStudentTickets counts to transaction docs.
    Transactions.find().forEach((tx) => {
      const studentTickets = Tickets.find({tx: tx.tx, type: 'STUDENT' }).count();
      const nonStudentTickets = Tickets.find({tx: tx.tx, type: 'NONSTUDENT' }).count();

      Transactions.update({ _id: tx._id }, { $set: {
        studentTickets,
        nonStudentTickets,
      }});
    });
  },
  down: function () {
    // let's keep those.
  },
});
