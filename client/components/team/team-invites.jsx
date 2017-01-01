import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Card, Icon, Button } from 'semantic-ui-react';
import moment from 'moment';

TeamInvites = class TeamInvites extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.ready) {
      return <Card.Group>{this._renderInvites()}</Card.Group>;
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
          <Button floated='left' icon='mail' color='green' inverted content='Resend'/>
          <Button floated='right' icon='trash' color='red' inverted content='Revoke'/>
        </Card.Content>
      </Card>
    ));
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
