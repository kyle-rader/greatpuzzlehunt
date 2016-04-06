import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import FloaterList from './FloaterList.jsx';

export default createContainer(() => {

  const usersHandle = Meteor.subscribe('users.floaters');
  const loading = !usersHandle.ready();

  const users = Meteor.users.find({}, {sort: {"profile.firstname": 1, "profile.lastname": 1}});

  return {
    loading,
    users: !loading ? users.fetch() : [],
  };

}, FloaterList);
