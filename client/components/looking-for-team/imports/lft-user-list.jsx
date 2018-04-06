import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'semantic-ui-react';

class Users extends Component {
  render() {
    if (!this.props.ready) return <Loading/>

    return (
      <Card.Group>
        { this._users() }
      </Card.Group>
    );
  }

  _users() {
    return this.props.users.map((user) => (
      <Card key={user._id}>
        <Card.Content>
          <Card.Header>
            {user.name}
          </Card.Header>
          <Card.Meta>
            { user.bio }
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Icon name='mail'/> <a href={`mailto:${user.getEmail()}`}>{user.getEmail()}</a>
        </Card.Content>
      </Card>
    ));
  }
}

Users = withTracker(() => {
  const user = Meteor.user();
  const handle = Meteor.subscribe('users.lookingForTeam');
  const ready = handle.ready();
  const users = Meteor.users.find({ _id: { $ne: user._id }, lookingForTeam: true }).fetch();

  return { ready, users };
})(Users);

export default Users;
