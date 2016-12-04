import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';

ProfileEditor = class ProfileEditor extends Component {
  constructor(props) {
    super(props);
    this.state = _makeStateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._makeStateFromProps(nextProps));
  }

  _makeStateFromProps(props) {
    const { user = {} } = props;
    return {
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      username: user.username || '',
      email: user.getEmail(),
    }
  }
}
