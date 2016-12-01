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
        <Loading />
      </div>
    );
  }

  _renderMain() {
    return (
      <div className="ui container">
        <PuzzlePageTitle title="Profile" subTitle={this.props.user.displayname} />
        <Loading />
        <br/>
      </div>
    );
  }

  render() {
    if (!this.props.user) {
      return this._renderLoading();
    }
    return (
      <Authed accessLevel="user">
        {this._renderMain()}
      </Authed>
    );
  }
}

Profile = createContainer((props) => {
  return {
    user: Meteor.user()
  };
}, Profile);
