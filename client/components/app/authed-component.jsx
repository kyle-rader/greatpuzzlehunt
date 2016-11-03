import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

AuthedComponent = class AuthedComponent extends React.Component {
  render() {
    if (this.props.canView()) {
      return this.props.children;
    } else {
      return <Login />;
    }
  }
}

AuthedComponent = createContainer(({ params }) => {
  const { accessLevel } = params;
  return {
    user: Meteor.user(),
    canView() {
      return Meteor.user() && Meteor.user().roles.indexOf(accessLevel) > -1;
    }
  };
}, AuthedComponent);
