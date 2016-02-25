const publicRoutes = FlowRouter.group({
    name: 'public'
});

publicRoutes.route('/login', {
    name: 'login',
    action() {
        ReactLayout.render(App, {yield: <Login />});
    }
});

/*publicRoutes.route('/about', {
    name: 'about',
    action() {
        ReactLayout.render(App, {yield: <Login />});
    }
});*/