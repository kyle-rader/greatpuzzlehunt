import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Card, Icon, Button, Message } from 'semantic-ui-react';

TeamMembers = class TeamMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
    };
  }

  render() {
    if (this.props.ready) {
      return (
        <Card.Group>
          {this._renderMembers()}
          <Message
           negative
           hidden={!this.state.error}
           icon="warning sign"
           onDismiss={() => this.setState({ error: null })}
           content={this.state.error ? this.state.error.reason : ''}
          />
          <Message
           positive
           hidden={!this.state.success || !this.props.showsSuccess}
           icon="check"
           content={this.state.success}
          />
        </Card.Group>
      );
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
            {member.getEmail()}<br/>{member.phone}
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Button floated='right' content='Remove' icon='remove user' labelPosition='right' onClick={() => this._handleRemoveUser(member)}></Button>
        </Card.Content>
      </Card>
    ));
  }

  _handleRemoveUser(member) {
    Meteor.call('teams.removeMember', member, (error, result) => {
      if (error) return this.setState({ error });

      this.setState({ success: `${member.name} has been removed from the team!`, error: null });
      Meteor.setTimeout(() => this.setState({ success: null }), 6000);
    });
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
