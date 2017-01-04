import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Segment, Header, Card, Button, Icon } from 'semantic-ui-react';
import { map } from 'lodash';
import moment from 'moment'

ProfileInvites = class ProfileInvites extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.ready) {
      return <Loading />
    } else if (this.props.invites.length === 0) {
      return null;
    }
    return this._renderMain();
  }

  _renderMain() {
    return (
      <Segment basic>
        <Header icon={<Icon name='ticket' color='violet'/>} content="You've been invited to these teams!"/>
        <Segment basic>
          <Card.Group>
            {this._renderInvites()}
          </Card.Group>
        </Segment>
      </Segment>
    );
  }

  _renderInvites() {
    return map(this.props.invites, (invite) => (
      <Card key={invite._id}>
        <Card.Content>
          <Card.Header>
            {invite.teamName}
          </Card.Header>
          <Card.Meta>
            <strong>Invited By:</strong> {invite.invitedBy.name}
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          {moment(invite.updatedAt).calendar()}
          <Button floated='right' icon='reply' color='green' inverted content='Accept' onClick={() => this._handleAcceptClick(invite)}/>
        </Card.Content>
      </Card>
    ));
  }

  _handleAcceptClick(invite) {
    Meteor.call('invites.accept', invite, (error, result) => {
      if (error) return alert(error.reason);
      browserHistory.push('/team');
    });
  }
}

ProfileInvites = createContainer(({ user }) => {
  const invitesHandle = Meteor.subscribe('invites.myInvites');
  const ready = invitesHandle.ready();
  const invites = Invites.find({ email: user.getEmail(), accepted: false }).fetch();

  return {
    ready,
    invites,
  };
}, ProfileInvites);
