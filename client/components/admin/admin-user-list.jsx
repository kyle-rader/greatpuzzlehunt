import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

AdminUserList = class AdminUserList extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.loading) return <Loading />

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
                        <input type="text" placeholder="Search" onChange={(e) => this._search(e)}/>
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
      </table>
    );
  }

  _getUserList() {
    return this.props.users.map((user) => <AdminUserListRow user={user} key={user._id}/>);
  }

  _search(event) {
    const search = event.target.value;
    const userList = $('tbody.userlist');
    userList.find(`tr:contains(${search})`).each(function() {
        $(this).show();
    });
    userList.find(`tr:not(:contains(${search}))`).each(function() {
        $(this).hide();
    });
  }
}

AdminUserList = createContainer(({ page = 1, search }) => {
  const usersHandle = Meteor.subscribe('admin.users', page);
  const loading = !usersHandle.ready();

  const options = {};

  const users = Meteor.users.find({ roles: { $ne: 'admin' } }, options).fetch();

  return {
    loading,
    users,
  };
}, AdminUserList);
