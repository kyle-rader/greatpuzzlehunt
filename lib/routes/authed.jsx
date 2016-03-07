const authedRoutes = FlowRouter.group({
    name: 'authed'
});

authedRoutes.route('/team', {
    name: 'team',
    action() {
        ReactLayout.render(App, {yield: <Team />});
    }
});

authedRoutes.route('/profile', {
    name: 'profile',
    action() {
        ReactLayout.render(App, {yield: <Login />});
    }
});