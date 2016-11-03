import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// User collection is already define by accounts-base package

// Ensure index
Meteor.startup(function () {
    if (Meteor.isServer) {
        Meteor.users._ensureIndex({ "firstname": 1, "lastname": 1, "username": 1});
    }
});

// Add Transform to user's Collection
Meteor.users._transform = function(user) {
  user.hasRole = function(role) {
    return this.roles.indexOf(role) >= 0;
  };

  return user;
};

// User collections methods:

let checkMinLength = function(length) {
    return Match.Where((x) => {
        check(x, String);
        return x.length >= length;
    });
};

let checkForAdmin = function() {
    if (!Meteor.userId) {
        throw new Meteor.Error(400, 'You must be logged in');
    }
    else if (Meteor.user().roles.indexOf('admin') < 0) {
        throw new Meteor.Error(400, 'You do not have permission to do that!');
    }
};

Meteor.methods({
    userCreate(fields) {
        check(fields, {
            firstname: String,
            lastname: String,
            username: String,
            userType: Match.OneOf("student", "faculty"),
            password: checkMinLength(6),
            confirmPassword: String,
            phone: String,
            major: Match.Optional(String),
        });

        // Check username for extra stuff
        if (fields.username.indexOf('@') > -1) {
            throw new Meteor.Error(400, 'Your username should not contain an @ symbol.  It should only be the username to the left of your @students.wwu.edu or @wwu.edu email address.');
        }

        // TODO: Change to WWU Domain
        let students = '@students.wwu.edu';
        let faculty  = '@wwu.edu';

        let email = fields.username.trim() + (fields.userType === 'student' ? students : faculty);
        let date = new Date();

        let userId = Accounts.createUser({
            email: email,
            password: fields.password,
            username: fields.username.trim().toLowerCase(),
            firstname: fields.firstname.trim(),
            lastname: fields.lastname.trim(),
            displayname: fields.firstname.trim() + ' ' + fields.lastname.trim(),
            major: fields.major.trim(),
            phone: fields.phone.trim(),
            created: date,
            updated: date,
            teamId: null,
        });

        if (Meteor.isServer) {
          Accounts.sendVerificationEmail(userId);
        }

        return {email: email};
    },

    userSendPasswordReset(fields) {
        check(fields, {
            username: String
        });

        if (Meteor.isServer) {
            let user = Accounts.findUserByUsername(fields.username);
            if (user) {
                Accounts.sendResetPasswordEmail(user._id);
                return {email: user.emails[0].address};
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

        checkForAdmin();

        if (Meteor.isServer) {
            let origUser = Meteor.users.findOne({_id: fields._id});
            if (!origUser) throw new Meteor.Error(400, 'No user by that id was found!');

            let needsVerification = (
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

        checkForAdmin();

        if (Meteor.isServer) {
            let origUser = Meteor.users.findOne({_id: fields._id});
            if (!origUser) throw new Meteor.Error(400, 'No user by that id was found!');

            if (!origUser.emails[0].verified) {
                Accounts.sendVerificationEmail(origUser._id);
            }

        }
    },

    userAdminResetPassword(fields) {
        check(fields, {
            _id: String
        });

        checkForAdmin();

        if (Meteor.isServer) {
            let origUser = Meteor.users.findOne({_id: fields._id});
            if (!origUser) throw new Meteor.Error(400, 'No user by that id was found!');

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

        checkForAdmin();

        let user = Meteor.users.findOne({_id: fields._id});
        if (!user) throw new Meteor.Error(400, `No user with id ${fields._id} was found!`);

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

        checkForAdmin();

        if (!Meteor.isServer)
            return;


        let users = Meteor.users.find({roles: {$in: [fields.role]}}).fetch();
        let emailAddresses = users.map((user) => { return user.emails[0].address });

        Email.send({
            to: emailAddresses,
            from: "WWU Puzzle Hunt <info@wwupuzzlehunt.com>",
            subject: fields.subject,
            text: fields.text
        });
    }

});
