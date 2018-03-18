import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import _ from 'lodash';

import { requireAdmin, isAdmin,
  NonEmptyString, StringPhoneNumber, PositiveNumber,
  makeName
} from '../imports/method-helpers.js';
import { getFormError } from './users';

const USERNAME_MIN_LENGTH = 4;
const PASSWORD_MIN_LENGTH = 6;

function checkUserData(data) {
  try {
    check(data, {
      _id: NonEmptyString,
      firstname: NonEmptyString,
      lastname: NonEmptyString,
      email: ValidEmail,
      accountType: Match.OneOf('STUDENT', 'NONSTUDENT', 'VOLUNTEER'),
      phone: StringPhoneNumber,
      age: PositiveNumber,
      address: NonEmptyString,
      city: NonEmptyString,
      zip: NonEmptyString,
      state: NonEmptyString,
      ecName: NonEmptyString,
      ecRelationship: NonEmptyString,
      ecPhone: StringPhoneNumber,
      ecEmail: ValidEmail,
      parentGuardian: String,
      photoPermission: Boolean,
    });
  } catch (ex) {
    throw getFormError(ex);
  }
};

function checkUserEmailData(data) {
  try {
    check(data, {
      userId: NonEmptyString,
      newEmail: ValidEmail,
    });
  } catch (ex) {
    throw getFormError(ex);
  }
};

// User collections methods:
Meteor.methods({

  'admin.user.update'(userData) {
    checkUserData(userData);
    requireAdmin();

    if (!Meteor.isServer) return true;

    Meteor.logger.info("Admin User Update:");
    Meteor.logger.logobj(userData);

    const userFields = _.omit(userData, "email");

    Meteor.users.update(userFields._id, { $set: userFields } );
  },

  'admin.user.updateEmail'(userEmailData) {
    checkUserEmailData(userEmailData);
    requireAdmin();

    if (Meteor.isClient) return;
    const { userId, newEmail } = userEmailData;

    const user = Meteor.users.findOne(userId);
    if (!user) throw new Meteor.Error(400, 'User not found!');

    const existingUser = Accounts.findUserByEmail(newEmail);
    if (existingUser && existingUser._id !== user._id) throw new Meteor.Error(400, 'A user with that email already exists!');

    // Exit if no change
    const currentEmail = user.getEmail();
    if (user.isVerified() && currentEmail === newEmail) return true;

    Accounts.addEmail(user._id, newEmail);
    Accounts.removeEmail(userId, currentEmail);
    Accounts.sendVerificationEmail(userId, newEmail);

    return true;
  },

  'admin.user.emailResend'(userId) {
    check(userId, String);
    requireAdmin();

    if (!Meteor.isServer) return true;

    const user = Meteor.users.findOne(userId);
    if (!user) throw new Meteor.Error(400, 'No user found!');

    Accounts.sendVerificationEmail(user._id);
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

});
