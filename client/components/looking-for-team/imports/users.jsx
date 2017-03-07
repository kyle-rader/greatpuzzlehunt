import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component, PropTypes } from 'react';
import { Card, Icon } from 'semantic-ui-react';

Users = class Users extends Component {
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

Users = createContainer(() => {
  const handle = Meteor.subscribe('users.lookingForTeam');
  const ready = handle.ready();
  const users = Meteor.users.find({ lookingForTeam: true }).fetch();

  return { ready, users };
}, Users);

export default Users;
