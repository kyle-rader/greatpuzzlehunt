import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

const authedRoutes = FlowRouter.group({
    name: 'authed'
});

authedRoutes.route('/team', {
    name: 'team',
    action() {
        mount(App, {yield: <Team />});
    }
});

authedRoutes.route('/admin', {
    name: 'admin',
    action() {
        if (Meteor.user() && Meteor.user().roles.indexOf('admin') >= 0) {
            mount(App, {yield: <Admin />});
        } else {
            mount(App, {yield: <Login />});
        }
    }
});

authedRoutes.route('/profile', {
    name: 'profile',
    action() {
        mount(App, {yield: <Login />});
    }
});

authedRoutes.route('/floaters', {
  name: 'floaters',
  action() {
    mount(App, {yield: <Floaters />});
  }
});

authedRoutes.route('/qrcode', {
    name: 'qrcode',
    action() {
        mount(App, {yield: <Game />});
    }
});
