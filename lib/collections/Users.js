import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// User collection is already define by accounts-base package

// Ensure index
Meteor.startup(function () {
    if (Meteor.isServer) {
        Meteor.users._ensureIndex({ "profile.firstname": 1, "profile.lastname": 1});
    }
});

// User collections methods:

let checkMinLength = function(length) {
    return Match.Where((x) => {
        check(x, String);
        return x.length >= length;
    });
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
            username: fields.username.trim(),
            firstname: fields.firstname.trim(),
            lastname: fields.lastname.trim(),
            displayname: fields.firstname.trim() + ' ' + fields.lastname.trim(),
            major: fields.major.trim(),
            phone: fields.phone.trim(),
            created: date,
            updated: date,
            teamId: null
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

        console.log('Checking fields: ', fields);

        check(fields, {
            _id: String,
            firstname: String,
            lastname: String,
            username: String,
            email: String
        });

        fields.email = fields.email.trim().toLowerCase();

        if (!Meteor.userId) {
            throw new Meteor.Error(400, 'You must be logged in');
        }
        else if (Meteor.user().roles.indexOf('admin') < 0) {
            throw new Meteor.Error(400, 'You do not have permission to update this user!');
        }

        if (Meteor.isServer) {
            let origUser = Meteor.users.findOne({_id: fields._id});
            if (!origUser) throw new Meteor.Error(400, 'No user by that id was found!');

            console.log(`Comparing ${fields.email} to ${origUser.emails[0].address.trim().toLowerCase()}`);
            console.log(`Current verification: ${origUser.emails[0].verified}`);

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

            if (needsVerification) {
                Accounts.sendVerificationEmail(origUser._id);
            }
        }
    }
});
