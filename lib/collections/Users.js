// User collection is already define by accounts-base package

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

        // TODO: Change to WWU Domain
        let students = '@kylerader.ninja' //'@students.wwu.edu';
        let faculty  = '@wwu.edu';

        let email = fields.username + (fields.userType === 'student' ? students : faculty);
        let date = new Date();

        let userId = Accounts.createUser({
            email: email,
            password: fields.password,
            username: fields.username,
            firstname: fields.firstname,
            lastname: fields.lastname,
            displayname: fields.firstname + ' ' + fields.lastname,
            major: fields.major,
            phone: fields.phone,
            created: date,
            updated: date,
            teamId: null
        });

        Accounts.sendVerificationEmail(userId);

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
    }
});