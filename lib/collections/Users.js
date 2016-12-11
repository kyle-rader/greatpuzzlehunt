import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { requireAdmin, isAdmin, checkMinLength } from '../imports/method-helpers.js';

// User collection is already define by accounts-base package

// Ensure index
Meteor.startup(function () {
    if (Meteor.isServer) {
        Meteor.users._ensureIndex({ "firstname": 1, "lastname": 1, "username": 1 });
    }
});

// Add Transform to user's Collection
Meteor.users._transform = function(user) {
  user.hasRole = function(role) {
    return this.roles.indexOf(role) >= 0;
  };

  user.getEmail = function(index = 0) {
    if (this.emails.length > 0 && index < this.emails.length && index >= 0) {
      return this.emails[index].address;
    }
    return null;
  }

  return user;
};

// User collections methods:
Meteor.methods({

  userSendPasswordReset(fields) {
    check(fields, {
      username: String
    });

    if (Meteor.isServer) {
      const user = Accounts.findUserByUsername(fields.username);
      if (user) {
        Accounts.sendResetPasswordEmail(user._id);
        return { email: user.getEmail() };
      }
      else {
        throw new Meteor.Error(400, 'No account found with that username!');
      }
    }
  },

  userAdminUpdate(fields) {

      check(fields, {
          _id: String,
          firstname: String,
          lastname: String,
          username: String,
          email: String
      });

      fields.email = fields.email.trim().toLowerCase();

      requireAdmin();

      if (Meteor.isServer) {
          const origUser = Meteor.users.findOne({_id: fields._id});
          if (!origUser) {
            throw new Meteor.Error(400, 'No user by that id was found!');
          }

          const needsVerification = (
              fields.email !== origUser.emails[0].address.trim().toLowerCase() ||
              !origUser.emails[0].verified);

          Meteor.users.update({_id: origUser._id}, {$set: {
              username: fields.username,
              "profile.displayname": `${fields.firstname} ${fields.lastname}`,
              "profile.firstname": fields.firstname,
              "profile.lastname": fields.lastname,
              "emails.0.address": fields.email,
              "emails.0.verified": needsVerification ? false : origUser.emails[0].verified
          }});
      }
  },

  userAdminVerifyEmail(fields) {
    check(fields, {
      _id: String
    });

    requireAdmin();

    if (Meteor.isServer) {
      let origUser = Meteor.users.findOne({_id: fields._id});
      if (!origUser) {
        throw new Meteor.Error(400, 'No user by that id was found!');
      }

      if (!origUser.emails[0].verified) {
        Accounts.sendVerificationEmail(origUser._id);
      }
    }
  },

  userAdminResetPassword(fields) {
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

  userAdminDelete(fields) {
    check(fields, {
      _id: String
    });

    checkForAdmin();

    if (Meteor.isServer) {
      let origUser = Meteor.users.findOne({_id: fields._id});
      if (origUser.profile.teamId) {
        throw new Meteor.Error('400', 'This user is on a team!');
      }
      Meteor.users.remove({_id: origUser._id});
    }
  },

  userPromoteToVolunteer(fields) {
    check(fields, {
      _id: String
    });

    requireAdmin();

    let user = Meteor.users.findOne({_id: fields._id});
    if (!user) {
      throw new Meteor.Error(400, `No user with id ${fields._id} was found!`);
    }

    if (user.roles.indexOf('volunteer') < 0 ) {
      // Adding volunteer role.
      Meteor.users.update({_id: user._id}, {$push: {roles: 'volunteer'}});
    } else {
      // Removing volunteer role.
      Meteor.users.update({_id: user._id}, {$pull: {roles: 'volunteer'}});
    }
  },

  userAdminBulkEmail(fields) {
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
  }

});
