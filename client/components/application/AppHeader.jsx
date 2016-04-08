// Application header

import React from 'react';

AppHeader = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            user: Meteor.user(),
            isAdmin: Meteor.user() && (Meteor.user().roles.indexOf('admin') > -1),
            isVolunteer: Meteor.user() && (Meteor.user().roles.indexOf('volunteer') > -1)
        };
    },

    logout(event) {
        event.preventDefault();
        return Meteor.logout( () => FlowRouter.go('/'));
    },

    componentDidMount() {
        if (this.refs.profileDropdown)
            $(this.refs.profileDropdown).dropdown();

        $(this.refs.menuDropdown).dropdown();
    },

    componentDidUpdate() {
        if (this.refs.profileDropdown)
            $(this.refs.profileDropdown).dropdown();
    },

    getRightMenu() {
        // User is logged in
        if (this.data.user) {
            let adminLink = this.data.isAdmin ?
                <a className="item" href="/admin">
                    <i className="violet tasks icon"></i>
                    Admin
                </a> :
                null;

            let volunteerLink = this.data.isVolunteer ?
                <a className="item" href="/volunteer">
                    <i className="teal clock icon"></i>
                    Volunteer
                </a> :
                null;

            return (
            <div className="right menu">
                <a className="ui icon item" href="https://google.com" target="_blank">
                    <i className="large red fitted google icon"></i>
                </a>
                <div className="ui dropdown item" ref="profileDropdown">
                    <i className="green user icon"></i>
                    {this.data.user.profile.displayname}
                    <div className="menu">
                        {adminLink}
                        {volunteerLink}
                        <a className="item" href="/team">
                            <i className="blue users icon"></i>
                            Team
                        </a>
                        <a className="item" href="/floaters">
                            <i className="orange search icon"></i>
                            Looking For Team
                        </a>
                        <a className="item" onClick={this.logout}>
                            <i className="sign out icon"></i> Logout
                        </a>
                    </div>
                </div>
            </div>
            );
        }
        // No User - public menu
        else {
            return (
            <div className="right menu">
                <a className="ui item" href="/register">
                    <i className="blue user add icon"></i>
                    Register
                </a>
                <a className="ui item" href="/login">
                    <i className="green sign in icon"></i>
                    Log In
                </a>
            </div>
            );
        }
    },

    render() {
        return (
        <div className="ui fixed large menu">
            <div className="ui dropdown item" ref="menuDropdown">
                <i className="red bars icon"></i> Menu
                <div className="menu">
                    <a className="item" href="/">
                        <i className="teal home icon"></i>&nbsp; Home
                    </a>
                    <a className="item" href="/info">
                        <i className="red info circle icon"></i>&nbsp; General Info
                    </a>
                    <a className="item" href="/puzzles">
                        <i className="purple puzzle icon"></i>&nbsp; Puzzles
                    </a>
                    <a className="item" href="/leaderboard">
                        <i className="yellow trophy icon"></i>&nbsp; Leaderboards
                    </a>
                    <a className="item" href="/contact">
                        <i className="green mail icon"></i>&nbsp; Contact
                    </a>
                    <a className="item" href="/teamlist">
                        <i className="blue users icon"></i>&nbsp; Team List
                    </a>
                </div>
            </div>

            {this.getRightMenu()}
        </div>);
    }
});
