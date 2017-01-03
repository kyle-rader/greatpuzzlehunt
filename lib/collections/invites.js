import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { findIndex } from 'lodash';
import moment from 'moment';

import { requireUser } from '../imports/method-helpers.js';
import { emailTeamInvite } from '../imports/emails.js';

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
  'teams.inviteMember'(team, email) {
    check(team, Object);
    try {
      check(email, ValidEmail);
    }
    catch (ex) {
      throw new Meteor.Error(400, 'You must enter a valid email address!');
    }

    requireUser();

    const user = Meteor.users.findOne({ _id: this.userId });
    if (!user.teamId) {
      throw new Meteor.Error(400, 'You must be on a team to invite people!');
    } else if (user.teamId !== team._id) {
      throw new Meteor.Error(400, 'You can only invite members to your team!');
    }

    // Only send and create invite on the server.
    if (!Meteor.isServer) return true;

    // Check team size limit
    const teamInvites = Invites.find({ teamId: user.teamId, accepted: false }).fetch();
    const existingIndex = findIndex(teamInvites, { email });

    if ((existingIndex === -1) && (teamInvites.length + team.members.length >= 6)) {
      throw new Meteor.Error(400, 'Teams can only have up to 6 members!');
    }

    const now = new Date();
    Invites.upsert({
      teamId: user.teamId,
      email,
    },
    {
      teamId: user.teamId,
      email,
      invitedBy: {
        _id: user._id,
        name: user.name,
      },
      updatedAt: now,
      accepted: false,
    });

    this.unblock();

    if (existingIndex === -1 || moment(teamInvites[existingIndex].updatedAt).isBefore(moment(now).subtract({ minutes: 5}))) {
      emailTeamInvite(team, user, email);
    }

  },

  'teams.deleteInvite'(team, email) {
    check(team, Object);
    check(email, String);

    requireUser();

    const user = Meteor.users.findOne({ _id: this.userId });
    if (!user.teamId) {
      throw new Meteor.Error(400, 'You must be on a team to invite people!');
    } else if (user.teamId !== team._id) {
      throw new Meteor.Error(400, 'You can only invite members to your team!');
    }

    return Invites.remove({ teamId: user.teamId, email, accepted: false });

  }

});
