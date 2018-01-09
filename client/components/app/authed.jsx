import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

Authed = class Authed extends React.Component {
  render() {
    const { user } = this.props;
    if (this.props.canView()) {
      if (user.paid) {
        return this.props.children;
      } else {
        return <RedeemTicket user={user}/>
      }
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
