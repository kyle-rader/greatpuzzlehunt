// ensure we are the client

Accounts.onLogin(() => {
    let currentRoute = FlowRouter.current(),
        path = currentRoute.path;

    return (path === '/login' || path === '/register') ? FlowRouter.go('/team') : FlowRouter.go(path);
});

// Verify this user via token (also logs the user in)
Accounts.onEmailVerificationLink((token, done) => {
    Accounts.verifyEmail(token, (err) => {
        if (err) {
            // Route to bad link page
            console.log(err);
        } else {
            done();
            FlowRouter.go('/team');
        }
    });
});

// Redirect users clicking the enrollment URL to the reset password form 
// now that we have their reset token.
Accounts.onEnrollmentLink((token, done) => {
    done();
    FlowRouter.go('/resetpassword?token=' + token);
});


// Redirect users clicking the reset password URL to the reset password from
// now that we have theur reset token
Accounts.onResetPasswordLink((token, done) => {
    done();
    FlowRouter.go('/resetpassword?token=' + token);
});