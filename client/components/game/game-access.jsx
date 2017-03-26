import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import QR from 'qrcode.react';

GameAccess = class GameAccess extends React.Component {
  render() {
    if (this.props.user.teamId) {
      return (
        <QR value={'${Meteor.absoluteUrl()}volunteer/time/${teamId}'} size={128} />
      );
    } else {
      return <Message
        info
        header='No Team'
        content='User must be part of a team to join the game' />;
    }
  }
}

GameAccess = createContainer((props) => ({
    user: Meteor.user()
}), GameAccess);