import { Meteor } from 'meteor/meteor';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';

Profile = class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      edit: false
    };
  }

  _renderLoading() {
    return (
      <div className="ui container">
        <LoadingSegment />
      </div>
    );
  }

  _renderMain() {
    if (!this.props.user) {
      return this._renderLoading();
    }
    return (
      <div className="ui container">
        <PuzzlePageTitle title="Profile" subTitle={this.props.user.displayname} />
        {JSON.stringify(this.props.user, null, 2)}
        <br/>
      </div>
    );
  }

  render() {
    return (
      <AuthedComponent accessLevel="user">
        {this._renderMain()}
      </AuthedComponent>
    );
  }
}

Profile = createContainer((props) => {
  return {
    user: Meteor.user()
  };
}, Profile);
