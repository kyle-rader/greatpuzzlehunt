import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

AuthedComponentContainer = createContainer(({ params }) => {
  const { accessLevel } = params;
  return {
    user: Meteor.user(),
    canView() {
      return Meteor.user() && Meteor.user().roles.indexOf(accessLevel) > -1;
    }
  };
}, AuthedComponent);
