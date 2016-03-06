// ensure we are the client

Accounts.onLogin(() => {
    let currentRoute = FlowRouter.current(),
        path = currentRoute.path;

    return (path === '/login' || path === '/register') ? FlowRouter.go('/team') : FlowRouter.go(path);
});

Accounts.onEmailVerificationLink((token, done) => {
    Accounts.verifyEmail(token, (err) => {
        if(err) {
            // Route to bad link page
            console.log(err);
        } else {
            FlowRouter.go('/team');
        }
    });
});