import { browserHistory } from 'react-router';

Accounts.onLogin(() => {
  const path = browserHistory.getCurrentLocation().pathname;

  if (path === '/login') {
    browserHistory.push('/profile');
  }

});

// Verify this user via token (also logs the user in)
Accounts.onEmailVerificationLink((token, done) => {
  Accounts.verifyEmail(token, (err) => {
      if (err) {
          // Route to bad link page
          console.log(err);
      } else {
          done();
          browserHistory.push('/profile');
      }
  });
});

// Redirect users clicking the enrollment URL to account setup
Accounts.onEnrollmentLink((token, done) => {
    done();
    browserHistory.push('/setup/' + token);
});

// Redirect users clicking the reset password URL to the reset password from
// now that we have theur reset token
Accounts.onResetPasswordLink((token, done) => {
    done();
    browserHistory.push('/passwordreset/' + token);
});
