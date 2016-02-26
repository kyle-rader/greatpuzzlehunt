// ensure we are the client

Accounts.onLogin(() => {
    let currentRoute = FlowRouter.current(),
        path = currentRoute.path;

    return (path === '/login' || path === '/register') ? FlowRouter.go('/') : FlowRouter.go(path);
});
