import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

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

Authed = withTracker(({ accessLevel }) => {
  return {
    user: Meteor.user(),
    canView() {
      return Boolean(Meteor.user()) && Meteor.user().hasRole(accessLevel);
    }
  };
})(Authed);
