// ensure we are the client

Accounts.onLogin(() => {
    let currentRoute = FlowRouter.current(),
        path = currentRoute.path;

    return path !== '/login' ? FlowRouter.go(path) : FlowRouter.go('/home');
});
