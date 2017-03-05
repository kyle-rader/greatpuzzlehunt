import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Form, Button, Icon, List, Message } from 'semantic-ui-react';

export default class PromoRegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'register',
    };
  }

  render() {
    switch (this.state.mode) {
      case 'thankyou':
        return this._thankyou();
      default:
        return this._form();
    }
  }

  _thankyou() {
    return (
      <Message icon>
        <Icon name='mail' color='green'/>
        <Message.Content>
          <Message.Header>Thank you for registering!<br/></Message.Header>
          We've sent you an email with a link to finish setting up your account!
        </Message.Content>
      </Message>
    );
  }

  _form() {
    return (
      <Form>
        <h3>Important Registration Information:</h3>
        <List>
          <List.Item><strong>Participants under age 18 (minor child):</strong> A parent/legal guardian must complete this registration form on behalf of their minor child.</List.Item>
          <List.Item><strong>Participants under age 14:</strong> In addition to registering their minor child, a parent/legal guardian must also register as a member of a team with their under age 14 minor child and accompany them at all times during the Puzzle Hunt.</List.Item>
          <List.Item><strong>Purchase T-Shirts</strong> In addition to registering their minor child, a parent/legal guardian must also register as a member of a team with their under age 14 minor child and accompany them at all times during the Puzzle Hunt.</List.Item>
        </List>
      </Form>
    );
  }

}
