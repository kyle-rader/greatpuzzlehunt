import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { createContainer } from 'meteor/react-meteor-data';
import AdminUser from './admin-user';

class AdminUserList extends Component {
  render() {
    if (this.props.loading) return <Loading />

    return (
      <Grid celled>
        { this._users() }
      </Grid>
    );
  }

  _users() {
    return this.props.users.map((user) => <AdminUser user={user} key={user._id}/>);
  }

}

AdminUserList = createContainer(({ page = 1, search }) => {
  const usersHandle = Meteor.subscribe('admin.users', page, search);
  const loading = !usersHandle.ready();

  const hasSearch = search && search.length > 0;
  const query = hasSearch ? {} : { roles: { $ne: 'admin' } };
  const options = {};

  const users = Meteor.users.find(query, options).fetch();

  return {
    loading,
    users,
  };
}, AdminUserList);

export default AdminUserList;
