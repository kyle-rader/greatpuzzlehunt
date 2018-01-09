import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';
import { requireAdmin, isAdmin, checkMinLength, NonEmptyString, requireUser, makeName } from '../imports/method-helpers.js';
import _ from 'lodash';

const PASSWORD_MIN_LENGTH = 6;

// Ensure index
Meteor.startup(function () {
  if (Meteor.isServer) {
    Meteor.users._ensureIndex({ "firstname": 1, "lastname": 1, "email": 1, "name": 1, });
  }
});

const BooleanTrue = Match.Where((x) => {
  check(x, Boolean);
  return x === true;
});

function checkUserData(data) {
  try {
    check(data, {
      firstname: NonEmptyString,
      lastname: NonEmptyString,
      email: NonEmptyString,
      accountType: Match.OneOf('STUDENT', 'NONSTUDENT', 'VOLUNTEER'),
      password: NonEmptyString,
      confirmPassword: NonEmptyString,
      photoPermission: Boolean,
      holdHarmless: BooleanTrue,
      coords: Match.Any,
    });
  } catch(ex) {
    throw getRegistrationError(ex);
  }
};

function checkUserAccount(data) {
  try {
    check(data, {
      firstname: NonEmptyString,
      lastname: NonEmptyString,
      bio: Match.Optional(String),
      lookingForTeam: Boolean,
    });
  } catch(ex) {
    throw getRegistrationError(ex);
  }
};

function getRegistrationError(ex) {
  switch (ex.path) {
    case 'firstname':
      return new Meteor.Error(400, 'Please enter your First Name.');
    case 'lastname':
      return new Meteor.Error(400, 'Please enter your Last Name.');
    case 'email':
      return new Meteor.Error(400, 'Please enter your email.');
    case 'accountType':
      return new Meteor.Error(400, 'Please select an Account Type.');
    case 'password':
      return new Meteor.Error(400, 'Please enter a Password.');
    case 'confirmPassword':
      return new Meteor.Error(400, 'Please confirm your Password.');
    case 'holdHarmless':
      return new Meteor.Error(400, 'You must accept the Hold Harmless Agreement above.');
    case 'bio':
      return new Meteor.Error(400, 'Your bio must be a string of text.');
    case 'lookingForTeam':
      return new Meteor.Error(400, '"Looking for team" is a Boolean option (true/false).');
    default:
      return ex;
  }
};

function checkPassword(password1, password2, minLength = PASSWORD_MIN_LENGTH) {
  if (password1.length < minLength) {
    throw new Meteor.Error(400, `Password must be at least ${minLength} characters long!`);
  }
  else if (password1 !== password2) {
    throw new Meteor.Error(400, 'Passwords do not match!');
  }
}

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

  user.name = makeName(user.firstname, user.lastname);

  user.isVerified = function() {
    return this.emails && this.emails.length > 0 && this.emails[0].verified;
  }

  return user;
};

// User collections methods:
Meteor.methods({
  'user.register'(data) {
    checkUserData(data);

    if (!Meteor.isServer) return true;
    // 1. Check Password meets requirements
    checkPassword(data.password, data.confirmPassword);

    // 2. Register User
    const roles = ['user'];
    const isVolunteer = data.accountType === 'VOLUNTEER';

    roles.push(isVolunteer ? 'volunteer' : 'player');
    data.paid = isVolunteer;
    data.roles = roles;

    const userId = Accounts.createUser(data);
    Accounts.sendVerificationEmail(userId);
  },

  findUserByToken(token) {
    check(token, String);
    const user = Meteor.users.findOne({ 'services.password.reset.token': token });
    return user;
  },

  'user.update.account'(fields) {
    checkUserAccount(fields);

    if (!Meteor.isServer) { return true; }

    requireUser();
    const currentUser = Meteor.userId();
    const { firstname, lastname, lookingForTeam, bio } = fields;

    return Meteor.users.update(currentUser, {
      $set: {
        firstname,
        lastname,
        lookingForTeam,
        bio,
        updatedAt: new Date(),
      },
    });
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

  'user.passwordReset'(email) {
    check(email, String);

    if (!Meteor.isServer) { return true; }

    if (email.length < 1) {
      throw new Meteor.Error(400, 'You must enter an email!');
    }

    const user = Accounts.findUserByEmail(email);
    if (user) {
      Accounts.sendResetPasswordEmail(user._id);
      return { email: user.getEmail() };
    }
    else {
      throw new Meteor.Error(400, 'No account found with that email!');
    }
  },

  'user.redeem'(ticketCode) {
    check(ticketCode, String);
    requireUser();
    if (!Meteor.isServer) { return true; }

    const currentUserId = Meteor.userId();
    const user = Meteor.users.findOne(currentUserId);
    // validate user needs to redeem
    if (user.paid) { throw new Meteor.Error(400, 'Your account is already active!'); }

    const ticket = Tickets.findOne({ code: ticketCode });
    // Validate ticket
    if (!ticket) { throw new Meteor.Error(400, 'That ticket code does not exist!'); }
    if (ticket.redeemed) { throw new Meteor.Error(400, 'That ticket has already been redeemed!'); }
    if (ticket.type !== user.accountType) { throw new Meteor.Error(400, `That ticket is only redeemable by ${ticket.type} accounts. You must redeem a ${user.accountType} ticket code!`); }

    // User gets to redeem this ticket.
    Tickets.update(ticket._id, { $set: {
      boughtBy: user._id,
      redeemed: true,
    }});
    return Meteor.users.update(user._id, { $set: {
      paid: true,
      ticketUsed: ticket._id,
    }});
  },

  userCount() {
    return Meteor.users.find({ roles: { $nin: ['admin', 'volunteer'] } }).count();
  },

});
