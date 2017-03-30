import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import { requireAdmin, isAdmin, checkMinLength, requireUser, makeName } from '../imports/method-helpers.js';
import _ from 'lodash';

const USERNAME_MIN_LENGTH = 4;
const PASSWORD_MIN_LENGTH = 6;

// Ensure index
Meteor.startup(function () {
  if (Meteor.isServer) {
    Meteor.users._ensureIndex({ "firstname": 1, "lastname": 1, "username": 1, "name": 1, });
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

  user.isVerified = function() {
    return this.emails && this.emails.length > 0 && this.emails[0].verified;
  }

  return user;
};

// User collections methods:
Meteor.methods({

  findUserByToken(token) {
    check(token, String);

    const user = Meteor.users.findOne({ 'services.password.reset.token': token });
    return user;
  },

  setupAccount(fields) {
    check(fields, {
      email: String,
      password1: String,
      password2: String,
      token: String,
      username: String,
    });
    const { email, username, password1, password2, token } = fields;

    if (!Meteor.isServer) {
      return true;
    }

    if (!email || email === '') {
      throw new Meteor.Error(400, 'Email must not be empty!');
    }
    if (!username || username === '') {
      throw new Meteor.Error(400, 'Username must not be empty!');
    }

    const existingEmail = Accounts.findUserByEmail(email);
    if (existingEmail) {
      throw new Meteor.Error(400, 'Sorry that email is already in use!  This is likely because someone else bought your registration and you need to switch to using your own email address :).  If you have questions email support@greatpuzzlehunt.com');
    }

    const existingUsername = Accounts.findUserByUsername(username);
    if (existingUsername) {
      throw new Meteor.Error(400, 'Sorry that username is already taken!');
    }

    if (username.length < USERNAME_MIN_LENGTH) {
      throw new Meteor.Error(400, `Username must be at least ${USERNAME_MIN_LENGTH} characters long!`);
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

    if (!Meteor.isServer) return {};

    // Set account info.
    const emailVerified = user.email === email;
    Accounts.addEmail(user._id, email, emailVerified);
    Accounts.setUsername(user._id, username);
    Accounts.setPassword(user._id, password1, { logout: true });

    // Remove initial email field
    Meteor.users.update(user._id, { $unset: { email: 1 }});

    if (!emailVerified) {
      Accounts.sendVerificationEmail(user._id);
    }

    // Fresh login for new account
    return { login: emailVerified };
  },

  'user.update.account': function(fields) {
    check(fields, {
      firstname: String,
      lastname: String,
      username: String,
      phone: String,
      lookingForTeam: Boolean,
      bio: String,
    });

    if (!Meteor.isServer) {
      return true;
    }

    requireUser();
    const currentUser = Meteor.userId();

    const { firstname, lastname, username, phone, lookingForTeam, bio } = fields;

    if (username.length < USERNAME_MIN_LENGTH) {
      throw new Meteor.Error(400, `Username must be at least ${USERNAME_MIN_LENGTH} characters long!`);
    }

    const existingUsername = Accounts.findUserByUsername(username);
    if (existingUsername && existingUsername._id !== currentUser) {
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

    Meteor.users.update(currentUser, {
      $set: {
        firstname,
        lastname,
        name: makeName(firstname, lastname),
        username,
        phone: cleanPhone,
        lookingForTeam,
        bio,
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
    Meteor.users.update(currentUser, {
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

  userCount() {
    return Meteor.users.find({ roles: { $nin: ['admin', 'volunteer'] } }).count();
  },

});
