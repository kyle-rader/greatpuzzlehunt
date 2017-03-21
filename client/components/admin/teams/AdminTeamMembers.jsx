import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Card, Icon, Button, Message } from 'semantic-ui-react';

AdminTeamMembers = class AdminTeamMembers extends Component {

  render() {
    if (this.props.ready) {
      return (
        <Card.Group>
          { this._renderMembers() }
        </Card.Group>
      );
    }
    return <Loading />;
  }

  _renderMembers() {
    return this.props.members.map((member) => (
      <Card key={ member._id }>
        <Card.Content>
          <Card.Header>
            {member.name}
          </Card.Header>
          <Card.Meta>
            { member.getEmail()}<br/>{ member.phone }
          </Card.Meta>
        </Card.Content>
      </Card>
    ));
  }
}

AdminTeamMembers = createContainer(({ team }) => {
  const membersHandle = Meteor.subscribe('admin.team.members', team._id);
  const ready = membersHandle.ready();
  const members = Meteor.users.find({ teamId: team._id }).fetch();

  return {
    ready,
    members,
  };
}, AdminTeamMembers);

AdminTeamMembers.propTypes = {
  team: React.PropTypes.object.isRequired,
};
