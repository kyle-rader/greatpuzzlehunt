import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Card, Icon, Button, Message } from 'semantic-ui-react';
import moment from 'moment';

TeamInvites = class TeamInvites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
    };
  }

  render() {
    if (this.props.ready) {
      return (
        <Card.Group>
          {this._renderInvites()}
          <Message
           positive
           hidden={!this.state.success}
           icon="check"
           onDismiss={() => this.setState({ success: null })}
           content={this.state.success}
          />
        </Card.Group>
      );
    }
    return <Loading />;
  }

  _renderInvites() {
    return this.props.invites.map((invite) => (
      <Card key={invite._id}>
        <Card.Content>
          <Card.Header>
            {invite.email}
          </Card.Header>
          <Card.Meta>
            Sent: {moment(invite.updatedAt).calendar()}
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Button floated='left' icon='mail' color='green' inverted content='Resend' onClick={() => this._handleResendClick(invite.email)}/>
          <Button floated='right' icon='trash' color='red' inverted content='Revoke'/>
        </Card.Content>
      </Card>
    ));
  }

  _handleResendClick(email) {
    Meteor.call('teams.inviteMember', this.props.team, email, (error, result) => {
      if (error) return this.setState({ error });

      this.setState({ success: `Invite resent to ${email}` });
      Meteor.setTimeout(() => {
        this.setState({ success: null });
      }, 6000);
    });
  }
}

TeamInvites = createContainer(({ team }) => {
  const invitesHandle = Meteor.subscribe('teams.invites');
  const ready = invitesHandle.ready();
  const invites = Invites.find({ teamId: team._id, accepted: false }).fetch();

  return {
    ready,
    invites,
  };
}, TeamInvites);
