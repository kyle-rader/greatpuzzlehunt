// Setup Email Verification
Accounts.emailTemplates.siteName = 'WWU Puzzle Hunt';
Accounts.emailTemplates.from = 'WWU Puzzle Hunt <accounts@wwupuzzlehunt.com>';
Accounts.emailTemplates.verifyEmail = {
    subject(user) {
        return 'WWU Puzzle Hunt Email Verification for: ' + user.profile.firstname;
    },
    html(user, url) {
        return `
<p>Hi ${user.profile.firstname}!</p>
<p>Note your username is <strong>${user.username}</strong>
<p>Please verify your email address by clicking <a href='${url}'>here</a>.</p>
<br>
<p>
Cheers,
The WWU Puzzle Hunt Team
</p>`;
    }
};

// Setup Enrollement/ Migration email
Accounts.emailTemplates.enrollAccount = {
    subject(user) {
        return user.profile.firstname + ', welcome to the new WWU Puzzle Hunt site!';
    },
    html(user, url) {
        return `Welcome ${user.profile.firstname}, to the new WWU Great Puzzle Hunt system!
  In order to finish your account migration please reset your password on the new site by clicking <a href="${url}">here</a>.
  Team Capitans please reset your team passwords on the team page.
  If you have any questions or concerns about this process please email <a href="mailto:millie.johnson@wwu.edu">Millie.Johnson@wwu.edu</a>
  Cheers,
  The WWU Puzzle Hunt Team`;
    }
};

Accounts.validateLoginAttempt((attempt) => {
    if (!attempt.allowed) {
        return false;
    }
    else if (attempt.user && !attempt.user.emails[0].verified) {
        throw new Meteor.Error(400, 'You must verify your email before logging in!  Questions? See our Contact page.');
    }
    else {
        return true;
    }
});

// Extending Account Creation
Accounts.onCreateUser((options, user) => {
    user.profile = options.profile || {};

    // Assign all other properties from the options
    user = _.extend(user, {
        profile: {
            firstname: options.firstname,
            lastname: options.lastname,
            displayname: options.displayname,
            major: options.major,
            phone: options.phone,
            teamId: options.teamId
        }
    });

    if (user.username === 'kyle+raderk') {
        user.profile.roles = ['admin'];
    }

    return user;
});
