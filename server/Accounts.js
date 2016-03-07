// Setup Email Verification
Accounts.emailTemplates.siteName = 'WWU Puzzle Hunt';
Accounts.emailTemplates.from = 'WWU Puzzle Hunt <accounts@wwupuzzlehunt.com>';
Accounts.emailTemplates.verifyEmail = {
    subject(user) {
        return 'Welcome to the WWU Puzzle Hunt ' + user.firstname;
    },
    text(user, url) {
        return 'Welcome ' + user.firstname + ', to the First Annual WWU Great Puzzle Hunt!\n\n' +
        'Please verify your email address by clicking the link below.\n' +
        url + ' \n\n' +
        'Cheers,\n' +
        'The WWU Puzzle Hunt Team';
    }
};

// Setup Enrollement/ Migration email
Accounts.emailTemplates.enrollAccount = {
    subject(user) {
        return user.firstname + ', welcome to the new WWU Puzzle Hunt site!';
    },
    html(user, url) {
        return 'Welcome ' + user.firstname + ', to the new WWU Great Puzzle Hunt system!\n\n' +
        'In order to finish your account migration please reset your password on the new site by clicking the link below.\n' +
        url + ' \n\n' +
        'If you have any questions or concerns about this process please email <a href="mailto:millie.johnson@wwu.edu">Millie.Johnson@wwu.edu</a>\n' +
        'Cheers,\n' +
        'The WWU Puzzle Hunt Team';
    }
};

Accounts.validateLoginAttempt((attempt) => {
    if (!attempt.allowed) {
        return false;
    }
    else if (attempt.user && !attempt.user.emails[0].verified) {
        throw new Meteor.Error(400, 'You must verify your email before logging in!');
    }
    else {
        return true;
    }
});

// Extending Account Creation
Accounts.onCreateUser((options, user) => {
    user.profile = options.profile || {};

    // Assign all other properties from the options
    user = _.extend(user, options);

    if (user.username === 'kyle+raderk') {
        user.roles = ['admin'];
    }

    return user;
});