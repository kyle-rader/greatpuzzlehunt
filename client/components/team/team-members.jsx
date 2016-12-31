import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Card, Icon, Button } from 'semantic-ui-react';

TeamMembers = class TeamMembers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.ready) {
      return <Card.Group>{this._renderMembers()}</Card.Group>;
    }
    return <Loading />;
  }

  _renderMembers() {
    return this.props.members.map((member) => (
      <Card key={member._id}>
        <Card.Content>
          <Card.Header>
            {member.name}
          </Card.Header>
          <Card.Meta>
            {member.phone} <br/>{member.getEmail()}
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Button floated='right'>Kick</Button>
        </Card.Content>
      </Card>
    ));
  }
}

TeamMembers = createContainer(({ team }) => {
  const membersHandle = Meteor.subscribe('users.myTeam');
  const ready = membersHandle.ready();
  const members = Meteor.users.find({ teamId: team._id }).fetch();

  return {
    ready,
    members,
  };
}, TeamMembers);

TeamMembers.propTypes = {
  team: React.PropTypes.object.isRequired,
};
