import { Meteor } from 'meteor/meteor';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import moment from 'moment';
import { extend } from 'lodash';

Profile = class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = extend({
        edit: false,
      },
      this._makeStateFromUser(props.user)
    );
  }

  _makeStateFromUser(user) {
    return {
      updatedAt: user ? moment(user.updatedAt).fromNow() : '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState(this._makeStateFromUser(nextProps.user));
    }
  }

  render() {
    return (
      <Authed accessLevel="user">
        { this.props.user ? this._renderMain() : <Loading /> }
      </Authed>
    );
  }

  _renderMain() {
    return (
    <Container>
      <PuzzlePageTitle title={this.props.user.name} subTitle={`Last Updated: ${this.state.updatedAt}`}/>
      <ProfileEditor user={this.props.user} />
      <ProfileTeamPreview />
      <PasswordEditor />
    </Container>
    );
  }

}

Profile = createContainer((props) => ({
    user: Meteor.user()
}), Profile);
