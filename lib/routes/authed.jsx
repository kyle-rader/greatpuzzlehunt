const authedRoutes = FlowRouter.group({
    name: 'authed'
});

authedRoutes.route('/home', {
    name: 'home',
    action() {
        ReactLayout.render(App, {yield: <Home />});
    }
});

