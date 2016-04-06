import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import UserListContainer from './UserListContainer.jsx';
import TeamListContainer from './TeamListContainer.jsx';

Admin = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            user: Meteor.user()
        };
    },

    componentWillUpdate() {
        if (this.data.user && (this.data.user.roles.indexOf('admin') < 0)) {
            FlowRouter.redirect('/team');
        }
    },

    componentWillMount() {
        if (this.data.user && (this.data.user.roles.indexOf('admin') < 0)) {
            FlowRouter.redirect('/team');
        }
    },

    componentDidMount() {
        $(this.refs.tabMenu).find('.item').tab();
    },

    render() {
        return (
            <div className="custom-bg red-square">
                <br/>
                <div className="ui raised segment transparent-bg">
                    <h3 className="ui violet header">Admin Panel</h3>
                    <div className="ui top attached tabular compact menu" ref="tabMenu">
                        <a className="active item" data-tab="users">
                            <i className="green user icon"></i> Users
                        </a>
                        <a className="item" data-tab="teams">
                            <i className="blue users icon"></i> Teams
                        </a>
                        
                    </div>
                    <div className="ui bottom attached active tab segment" data-tab="users">
                        <UserListContainer />
                    </div>
                    <div className="ui bottom attached tab segment" data-tab="teams">
                        <TeamListContainer />
                    </div>
                </div>
            </div>
        );
    }
});

/*
Admin.propTypes = {
    list: React.PropTypes.object,
    ...
}
        
*/
