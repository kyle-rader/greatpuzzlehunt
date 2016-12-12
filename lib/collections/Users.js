import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import { requireAdmin, isAdmin, checkMinLength, requireUser, makeName } from '../imports/method-helpers.js';

const USERNAME_MIN_LENGTH = 4;
const PASSWORD_MIN_LENGTH = 6;

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

  findUserByToken(token) {
    check(token, String);

    const user = Meteor.users.findOne({ 'services.password.reset.token': token }, {
      fields: { name: 1 },
    });
    return user;
  },

  setupAccount(fields) {
    check(fields, Object);
    const { username, password1, password2, token } = fields;

    if (!Meteor.isServer) {
      return false;
    }

    if (username.length < USERNAME_MIN_LENGTH) {
      throw new Meteor.Error(400, `Username must be at least ${USERNAME_MIN_LENGTH} characters long!`);
    }

    const existingUser = Accounts.findUserByUsername(username);
    if (existingUser) {
      throw new Meteor.Error(400, 'Sorry that username is already taken!');
    }

    if (password1.length < PASSWORD_MIN_LENGTH) {
      throw new Meteor.Error(400, `Password must be at least ${PASSWORD_MIN_LENGTH} characters long!`);
    }
    else if (password1 !== password2) {
      throw new Meteor.Error(400, 'Passwords do not match!');
    }

    const user = Meteor.users.findOne({ 'services.password.reset.token': token });
    if (!user) {
      throw new Meteor.Error(400, 'Invalid token!');
    }

    // Set account info.
    Accounts.setUsername(user._id, username);
    Accounts.setPassword(user._id, password1, { logout: true });

    // Fresh login for new account
    return true;
  },

  'user.update.account': function(fields) {
    check(fields, {
      firstname: String,
      lastname: String,
      username: String,
      phone: String,
    });

    if (!Meteor.isServer) {
      return true;
    }

    requireUser();
    const currentUser = Meteor.userId();

    const { firstname, lastname, username, phone } = fields;

    if (username.length < USERNAME_MIN_LENGTH) {
      throw new Meteor.Error(400, `Username must be at least ${USERNAME_MIN_LENGTH} characters long!`);
    }

    const existingUser = Accounts.findUserByUsername(username);
    if (existingUser && existingUser._id !== currentUser) {
      throw new Meteor.Error(400, 'Sorry that username is already taken!');
    }

    if (firstname.length === 0) {
      throw new Meteor.Error(400, 'Firstname must not be empty!');
    } else if (lastname.length === 0) {
      throw new Meteor.Error(400, 'Lastname must not be empty!');
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      throw new Meteor.Error(400, 'Phone number must be a full 10 digit US phone number');
    }

    Meteor.users.update({ _id: currentUser }, {
      $set: {
        firstname,
        lastname,
        name: makeName(firstname, lastname),
        username,
        phone: cleanPhone,
        updatedAt: new Date(),
      },
    });

    return true;
  },

  'user.update.password': function(fields) {
    check(fields, {
      newPassword: String,
      confirmPassword: String,
    });

    if (!Meteor.isServer) {
      return true;
    }

    requireUser();
    const currentUser = Meteor.userId();

    const { newPassword, confirmPassword } = fields;

    if (newPassword.length < PASSWORD_MIN_LENGTH) {
      throw new Meteor.Error(400, `Password must be at least ${PASSWORD_MIN_LENGTH} characters long!`);
    }
    else if (newPassword !== confirmPassword) {
      throw new Meteor.Error(400, 'Passwords do not match!');
    }

    Accounts.setPassword(currentUser, newPassword, {
      logout: false,
    });
    Meteor.users.update({ _id: currentUser}, {
      $set: { updatedAt: new Date() },
    });

    return true;
  },

  'user.passwordReset'(username) {
    check(username, String);

    if (!Meteor.isServer) {
      return true;
    }

    if (username.length < USERNAME_MIN_LENGTH) {
      throw new Meteor.Error(400, 'Username must be at least 4 characters!');
    }

    const user = Accounts.findUserByUsername(username);
    if (user) {
      Accounts.sendResetPasswordEmail(user._id);
      return { email: user.getEmail() };
    }
    else {
      throw new Meteor.Error(400, 'No account found with that username!');
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
