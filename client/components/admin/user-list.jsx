import React from 'react';
import { Meteor } from 'meteor/meteor';

export default UserList = React.createClass({

    mixins:[ReactMeteorData],
    getMeteorData() {
        let data = {};

        let usersHandle = Meteor.subscribe('users.all');
        let loading = !usersHandle.ready();

        if (!loading) {
            data.users = Meteor.users.find({}, {sort: {"profile.firstname": 1, "profile.lastname": 1}}).fetch()
        }

        return data;
    },

    getUserList() {
        return this.data.users.map((user) => {
            return (
            <UserListRow user={user} key={user._id}/>
            );
        });
    },

    search(event) {
        let search = event.target.value;
        let userList = $('tbody.userlist');
        userList.find(`tr:contains(${search})`).each(function() {
            $(this).show();
        });
        userList.find(`tr:not(:contains(${search}))`).each(function() {
            $(this).hide();
        });
    },

    componentDidMount() {
    },

    render() {
        if (this.data.users) {
            return (
            <table className="ui compact celled table">
                <thead ref="controlRow" className="full-width control-row">
                    <tr>
                        <th colSpan="5">
                            <div className="ui grid">
                                <div className="six wide column">
                                    <div className="ui large green label">
                                        <i className="user icon"></i>
                                        &nbsp;
                                        {this.data.users.length} Users
                                    </div>
                                </div>
                                <div className="ten wide column">
                                    <div className="ui fluid right icon input">
                                        <input type="text" placeholder="Search" onChange={this.search}/>
                                        <i className="search icon"></i>
                                    </div>
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <thead className="full-width">
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Team</th>
                        <th>Actions</th>
                    </tr>
                </thead>
              <tbody className="userlist">
                {this.getUserList()}
              </tbody>
              <tfoot className="full-width">
                <tr>
                  <th colSpan="5">

                  </th>
                </tr>
              </tfoot>
            </table>
            );
        } else {
            return <Loading />;
        }
    }
});
