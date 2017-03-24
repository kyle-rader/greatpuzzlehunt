import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import { requireAdmin, isAdmin, checkMinLength, makeName } from '../imports/method-helpers.js';
import _ from 'lodash';

const USERNAME_MIN_LENGTH = 4;
const PASSWORD_MIN_LENGTH = 6;

// User collections methods:
Meteor.methods({

  'admin.user.emailResend'(userId) {
    check(userId, String);
    requireAdmin();

    if (!Meteor.isServer) return true;

    const user = Meteor.users.findOne(userId);
    if (!user) throw new Meteor.Error(400, 'No user found!');

    if (user.email && !user.getEmail()) {
      // User has not setup account and we need to send Enrollment Email
      Accounts.addEmail(user._id, user.email, true);
      Accounts.sendEnrollmentEmail(user._id);
      Accounts.removeEmail(user._id, user.email);
    }
    else if (user.emails && user.emails.length > 0 && !user.emails[0].verified) {
      // User has not verified email and we need to resend Verification Email
      Accounts.sendVerificationEmail(user._id);
    }
    return true;
  },

  'admin.user.resetPassword'(fields) {
    check(fields, {
      _id: String
    });

    requireAdmin();

    if (Meteor.isServer) {
      let origUser = Meteor.users.findOne({_id: fields._id});
      if (!origUser) {
        throw new Meteor.Error(400, 'No user by that id was found!');
      }

      Accounts.sendResetPasswordEmail(origUser._id);
    }
  },

  'admin.user.delete'(userId) {
    check(userId, String);
    requireAdmin();
    if (!Meteor.isServer) return true;

    const user = Meteor.users.findOne(userId);
    if (!user) throw new Meteor.Error(400, 'No user found!');

    if (user.teamId) {
      const team = Teams.findOne(user.teamId);
      if (team.members.length === 1) {
        Teams.remove(team._id);
        Invites.remove({ teamId: team._id });
      } else if (user._id === team.owner) {
        const newOwner = _.head(_.filter(team.members, (u) => u !== user._id));
        Teams.update(user.teamId, {
          $pull: { members: user._id },
          $set: { owner: newOwner },
        });
      } else {
        Teams.update(user.teamId, { $pull: { members: user._id } });
      }
    }
    RemovedUsers.insert(user);
    Meteor.users.remove(user._id);
  },

  'admin.user.toggleRole'(userId, role) {
    check(userId, String);
    check(role, String);
    requireAdmin();
    if (!Meteor.isServer) return true;

    const user = Meteor.users.findOne(userId);
    if (!user) throw new Meteor.Error(400, `No user with id ${fields._id} was found!`);
    if (this.userId === userId && role === 'admin' && user.hasRole('admin')) throw new Meteor.Error(400, 'You cannot remove yourself from admin');

    const action = user.hasRole(role) ? '$pull' : '$push';
    Meteor.users.update(user._id, { [action]: { roles: role } });
  },

  'admin.bulkEmail'(fields) {
    check(fields, {
      role: String,
      subject: String,
      text: String
    });

    requireAdmin();

    if (!Meteor.isServer)
      return;


    const users = Meteor.users.find({ roles: {$in: [fields.role] } }).fetch();
    const emails = users.map((user) => (user.getEmail()));

    Email.send({
      to: emails,
      from: "WWU Puzzle Hunt <info@wwupuzzlehunt.com>",
      subject: fields.subject,
      text: fields.text
    });
  },

  'admin.users.fetch'() {
    requireAdmin();

    return Meteor.users.find({ roles: { $ne: 'admin' } }, {
      fields: { firstname: true, lastname: true, email: true, emails: true, username: true },
    }).fetch();
  },

  'admin.user.updateEmail'(userId, newEmail) {
    check(userId, String);
    check(newEmail, String);

    requireAdmin();

    if (!Meteor.isServer)
      return;

    const user = Meteor.users.findOne(userId);
    if (!user) throw new Meteor.Error(400, 'User not found!');

    const existingUser = Accounts.findUserByEmail(newEmail);
    if (existingUser && existingUser._id !== user._id) throw new Meteor.Error(400, 'A user with that email already exists!');

    // Exit if no change
    if (user.isVerified() && user.getEmail() === newEmail) return true;

    if (user.email) {
      // This user has not finished setting up their account and we just need to update
      // the pre-email field.
      Meteor.users.update(userId, { $set: { email: newEmail } });
    } else {
      // This user has setup their account, and we can update their actual email
      currentEmail = user.getEmail();
      Accounts.addEmail(user._id, newEmail);
      Accounts.removeEmail(userId, currentEmail);
      Accounts.sendVerificationEmail(userId, newEmail);
    }
    return true;
  }

});
