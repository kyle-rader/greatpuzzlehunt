import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { requireUser } from '../imports/method-helpers.js';

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

    requireUser();
    const user = Meteor.users.findOne({ _id: this.userId });
    if (!user.teamId) {
      throw new Meteor.Error(400, 'You must be on a team to invite people!');
    }

    return Invites.upsert({
      teamId: user.teamId,
      email
    },
    {
      teamId: user.teamId,
      email,
      updatedAt: new Date(),
      accepted: false,
    });
  },
});
