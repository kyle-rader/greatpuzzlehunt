const publicRoutes = FlowRouter.group({
    name: 'public'
});

publicRoutes.route('/', {
    name: 'home',
    action() {
        ReactLayout.render(App, {yield: <Home />});
    }
});

publicRoutes.route('/login', {
    name: 'login',
    action() {
        ReactLayout.render(App, {yield: <Login />});
    }
});

publicRoutes.route('/register', {
    name: 'register',
    action() {
        ReactLayout.render(App, {yield: <Register />});
    }
});

publicRoutes.route('/info', {
    name: 'info',
    action() {
        ReactLayout.render(App, {yield: <Info />});
    }
});

publicRoutes.route('/contact', {
    name: 'contact',
    action() {
        ReactLayout.render(App, {yield: <Contact />});
    }
});

publicRoutes.route('/puzzles', {
    name: 'puzzles',
    action() {
        ReactLayout.render(App, {yield: <Puzzles />});
    }
});

publicRoutes.route('/teamlist', {
    name: 'teamlist',
    action() {
        ReactLayout.render(App, {yield: <TeamList />});
    }
});

publicRoutes.route('/requestpasswordreset', {
    name: 'requestpasswordreset',
    action() {
        ReactLayout.render(App, {yield: <RequestPasswordReset />});
    }
});

publicRoutes.route('/passwordreset/:token', {
    name: 'passwordreset',
    action(params, queryParams) {
        ReactLayout.render(App, {yield: <PasswordReset token={params.token}/>});
    }
});