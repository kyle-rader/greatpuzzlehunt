import { Meteor } from 'meteor/meteor';

// Add Transform to user's Collection
Meteor.users._transform = function(user) {
  user.hasRole = function(role) {
    return this.roles.indexOf(role) >= 0;
  };

  return user;
};
