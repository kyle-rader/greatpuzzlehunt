import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

AdminUserList = class AdminUserList extends Component {
    _getUserList() {
        return this.props.users.find().map((user) => {
            return (
                <AdminUserListRow user={user} key={user._id}/>
            );
        });
    }

    _search(event) {
        let search = event.target.value;
        let userList = $('tbody.userlist');
        userList.find(`tr:contains(${search})`).each(function() {
            $(this).show();
        });
        userList.find(`tr:not(:contains(${search}))`).each(function() {
            $(this).hide();
        });
    }

    render() {
        if (this.props.users) {
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
                                        {this.props.users.length} Users
                                    </div>
                                </div>
                                <div className="ten wide column">
                                    <div className="ui fluid right icon input">
                                        <input type="text" placeholder="Search" onChange={this._search}/>
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
                {this._getUserList()}
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
}

AdminUserList = createContainer((props) => {
  return {
    users: Meteor.users
  };
}, AdminUserList);
