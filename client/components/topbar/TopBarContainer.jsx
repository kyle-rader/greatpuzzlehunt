import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

TopBarContainer = createContainer(({ params }) => {
  return {
    user: Meteor.user(),
    isAdmin() {
      return !!Meteor.user() && Meteor.user().roles.indexOf('admin') > -1;
    }
  };
}, TopBar);
