import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { registrationInfoHTML } from '../../lib/imports/emails';

const { siteName, eventYear, siteURL, accountsEmail } = Meteor.settings.public;

const questions = `<p>If you have any questions please email <a href="mailto:support@greatpuzzleHunt.com">support@greatpuzzlehunt.com</a></p>`;
const signature = `
<p>
  Cheers,<br>
  The ${siteName} Team
</p>
`;

// Customize Email Verification email
Accounts.emailTemplates.siteName = siteName;
Accounts.emailTemplates.from = accountsEmail;

Accounts.emailTemplates.verifyEmail = {
    subject(user) {
        return `${siteName} Email Verification for: ${user.getEmail()}`;
    },
    html(user, url) {
        return `
<p>Hi ${user.firstname}!</p>
<p>Please verify your email (${user.getEmail()}) by <a target="_blank" href='${url}'>clicking here</a>.</p>
${questions}
${registrationInfoHTML}
${signature}
`;
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

  // email and password get set specially, take all other options and
  // set them directly on the user document.
  user = _.extend(user, _.omit(options, ['email', 'password', 'confirmPassword']));
  const now = new Date();
  user.createdAt = now;
  user.updatedAt = now;

  return user;
});
