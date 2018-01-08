import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Segment, Message, Form, Icon } from 'semantic-ui-react';

RedeemTicket = class RedeemTicket extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Segment basic>
        You must redeem a ticket!
      </Segment>
    );
  }
}
