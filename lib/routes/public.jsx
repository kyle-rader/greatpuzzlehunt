const publicRoutes = FlowRouter.group({
    name: 'public'
});

publicRoutes.route('/', {
    name: 'root',
    action() {
        ReactLayout.render(App, {yield: <Login />});
    }
});

publicRoutes.route('/login', {
    name: 'login',
    action() {
        ReactLayout.render(App, {yield: <Login />});
    }
});
