import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

Authed = class Authed extends React.Component {
  render() {
    if (this.props.canView()) {
      return this.props.children;
    } else {
      return <Login />;
    }
  }
}

Authed = createContainer(({ accessLevel }) => {
  return {
    user: Meteor.user(),
    canView() {
      return Boolean(Meteor.user()) && Meteor.user().hasRole(accessLevel);
    }
  };
}, Authed);
