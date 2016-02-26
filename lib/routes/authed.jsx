const authedRoutes = FlowRouter.group({
    name: 'authed'
});

authedRoutes.route('/', {
    name: 'home',
    action() {
        ReactLayout.render(App, {yield: <Home />});
    }
});