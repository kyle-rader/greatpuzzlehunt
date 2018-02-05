import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import AdminUser from './admin-user';

class AdminUserListInner extends Component {
  render() {
    if (this.props.loading) return <Loading />

    return (
      <Card.Group doubling stackable itemsPerRow='4'>
        { this._users() }
      </Card.Group>
    );
  }

  _users() {
    return this.props.users.map((user) => <AdminUser user={user} key={user._id}/>);
  }

}

AdminUserListTracker = withTracker(({ search }) => {
  const usersHandle = Meteor.subscribe('admin.users', search);
  const loading = !usersHandle.ready();

  if (loading) return { loading, users: [] };

  const hasSearch = search && search.length > 0;

  const defaultSort = [
    ['createdAt', 'desc'],
    ['firstname', 'desc'],
  ];

  const options = {
    sort: defaultSort,
  };

  let query = {};
  if (hasSearch) {
    search = search.trim();
    query = {
      $or: [
        { 'firstname': { $regex: search, $options: 'i' } },
        { 'lastname': { $regex: search, $options: 'i' } },
        { 'emails': { $elemMatch: { address: { $regex: search, $options: 'i' } } } },
      ],
    };
  }

  const teams = Teams.find({}).fetch().reduce((acc, t) => {
    acc[t._id] = t.name;
    return acc;
  }, {});

  const users = Meteor.users.find(query, options).fetch().map((u) => {
    u.teamName = u.teamId ? teams[u.teamId] : '';
    return u;
  });

  return {
    loading,
    users,
  };
})(AdminUserListInner);

export default AdminUserListTracker;
