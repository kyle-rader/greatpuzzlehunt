import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

const publicRoutes = FlowRouter.group({
    name: 'public'
});

publicRoutes.route('/', {
    name: 'home',
    action() {
        mount(App, {yield: <Home />});
    }
});

publicRoutes.route('/login', {
    name: 'login',
    action() {
        mount(App, {yield: <Login />});
    }
});

publicRoutes.route('/register', {
    name: 'register',
    action() {
        mount(App, {yield: <Register />});
    }
});

publicRoutes.route('/info', {
    name: 'info',
    action() {
        mount(App, {yield: <Info />});
    }
});

publicRoutes.route('/contact', {
    name: 'contact',
    action() {
        mount(App, {yield: <Contact />});
    }
});

publicRoutes.route('/puzzles', {
    name: 'puzzles',
    action() {
        mount(App, {yield: <Puzzles />});
    }
});

publicRoutes.route('/qrcode', {
    name: 'qrcode',
    action() {
        mount(App, {yield: <QRCode />});
    }
});

// publicRoutes.route('/teamlist', {
//     name: 'teamlist',
//     action() {
//         mount(App, {yield: <TeamList />});
//     }
// });

publicRoutes.route('/gallery', {
    name: 'gallery',
    action() {
        mount(App, {yield: <Gallery />});
    }
});

publicRoutes.route('/requestpasswordreset', {
    name: 'requestpasswordreset',
    action() {
        mount(App, {yield: <RequestPasswordReset />});
    }
});

publicRoutes.route('/passwordreset/:token', {
    name: 'passwordreset',
    action(params, queryParams) {
        mount(App, {yield: <PasswordReset token={params.token}/>});
    }
});
