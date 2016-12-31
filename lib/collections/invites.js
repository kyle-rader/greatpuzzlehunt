import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Invites = new Mongo.Collection('invites');

/*
Structure of a TeamInvite:

{
  _id: String,
  teamId: String,
  email: String,
  invitedBy: {
    _id: String,
    name: String,
  },
  accepted: Boolean,

}
*/

Meteor.methods({
  'teams.inviteMember'(email) {
    try {
      check(email, ValidEmail);
    }
    catch(ex) {
      throw new Meteor.Error(400, 'You must enter a valid email address!');
    }
  },
});
