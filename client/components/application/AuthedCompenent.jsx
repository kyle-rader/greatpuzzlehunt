import { Meteor } from 'meteor/meteor';
import React from 'react';

AuthedComponent = class AuthedComponent extends React.Component {
  render() {
    if (this.props.canView()) {
      return this.props.children;
    } else {
      return <Login />;
    }
  }
}
