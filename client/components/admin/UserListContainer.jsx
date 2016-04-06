import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import UserList from './UserList.jsx';

export default createContainer( ({ params }) => {

  const usersHandle = Meteor.subscribe('users.all');
  const loading = !usersHandle.ready();

  const users = Meteor.users.find({}, {sort: {"profile.firstname": 1, "profile.lastname": 1}});

  return {
    loading,
    users: !loading ? users.fetch() : [],
  };

}, UserList);