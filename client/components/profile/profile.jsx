import { Meteor } from 'meteor/meteor';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import moment from 'moment';

Profile = class Profile extends Component {

  _makeStateFromUser(user) {
    return {
      updatedAt: user ? moment(user.updatedAt).fromNow() : '',
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      updatedAt: this._makeStateFromUser(props.user),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState(this._makeStateFromUser(nextProps.user));
    }
  }

  _renderMain() {
    return (
    <Container>
      <PuzzlePageTitle title={`Profile: ${this.props.user.displayname}`} subTitle={`Last Updated: ${this.state.updatedAt}`}/>
    </Container>
    );
  }

  render() {
    return (
      <Authed accessLevel="user">
        { this.props.user ? this._renderMain() : <Loading /> }
      </Authed>
    );
  }
}

Profile = createContainer((props) => {
  return {
    user: Meteor.user()
  };
}, Profile);
