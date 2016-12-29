import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

export default function makeAuthed(accessLevel) {
  return class CustomAuthedComp extends Component {
    render() {
      return <Authed accessLevel={accessLevel}>{this.props.children}</Authed>;
    }
  };
}
