// Define our main App component

import React from 'react';

App = React.createClass({
    
    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            hasUser: !!Meteor.user(),
            isPublic(route) {
                let publicRoutes = ['home', 'login', 'register', 'requestpasswordreset', 'passwordreset', 'info', 'puzzles', 'contact', 'teamlist', 'leaderboard', 'qrcode', 'gallery'];

                return publicRoutes.indexOf(route) > -1;
            },
            canView() {
                return this.isPublic(FlowRouter.current().route.name) || !!Meteor.user();
            }
        };
    },

    getView() {
        return this.data.canView() ? this.props.yield : <Login />;
    },

    render() {
        return (
        <div className="app-root">
            <AppHeader hasUser={this.data.hasUser} />
            {this.getView()}
        </div>);
    }
});