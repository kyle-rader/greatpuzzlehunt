import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const { siteName, accountsEmail } = Meteor.settings.public;

// Setup Email Verification
Accounts.emailTemplates.siteName = siteName;
Accounts.emailTemplates.from = accountsEmail;

Accounts.emailTemplates.verifyEmail = {
    subject(user) {
        return `${siteName} Email Verification for: ${user.getEmail()}`;
    },
    html(user, url) {
        return `
<p>Hi ${user.firstname}!</p>
<p>Your username is <strong>${user.username}</strong>
<p>Please verify this email address by clicking <a href='${url}'>here</a>.</p>
<br>
<p>
Cheers,<br>
The ${siteName} Team
</p>`;
    }
};

// Setup Enrollement/ Migration email
Accounts.emailTemplates.enrollAccount = {
    subject(user) {
        return `Welcome to the ${siteName}!`;
    },
    html(user, url) {
        return `
<h3>Welcome ${user.firstname}, to the ${siteName}!</h3>
<p>To finish setting up your account <a href="${url}">click here</a>.</p>
<p>You will be asked to set your email, username, and password.
Then you will be able to create your team and invite your friends!
</p>
<p>If you have any questions about the account setup process please email <a href="mailto:support@greatpuzzlehunt.com">support@greatpuzzlehunt.com</a></p>
<br>
<p>Welcome to the hunt!<br>
<p>Cheers,</p>
<p>The ${siteName} Team</p>`;
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

  // Assign all other properties from the options
  user = _.extend(user, _.omit(options, ['password']));

  return user;
});
