import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Segment, Header, Form, Message, Icon } from 'semantic-ui-react';
import { extend, pick } from 'lodash';

PasswordEditor = class PasswordEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmPassword: '',
    };
  }

  render() {
    return (
    <Segment basic>
      <Form onSubmit={(e) => this._handleSubmit(e)}>
        <Header as='h3' content='Change Password' icon={<Icon name='lock' color='orange'/>} />
        <Form.Group widths='equal'>
          <Form.Input name='newPassword' label='New Password' type="password" value={this.state.newPassword} onChange={(e) => this._handleChange(e)} />
          <Form.Input name='confirmPassword' label='Confirm Password' type="password" value={this.state.confirmPassword} onChange={(e) => this._handleChange(e)} />
        </Form.Group>
        <Form.Button type='submit' color="orange" content="Save"/>
        <Message
         negative
         hidden={!this.state.error}
         icon="warning sign"
         onDismiss={() => this.setState({ error: null })}
         content={this.state.error ? this.state.error.reason : ''}
        />
        <Message
         positive
         hidden={!this.state.success}
         icon="check"
         content={this.state.success}
        />
      </Form>
    </Segment>
    );
  }

  _handleSubmit(e) {
    e.preventDefault();

    const fields = pick(this.state, ['newPassword', 'confirmPassword']);

    Meteor.call('user.update.password', fields, (error, result) => {
      if (error) return this.setState({ error });

      this.setState({ success: 'Password Saved!', error: null, newPassword:'', confirmPassword: '' });
      Meteor.setTimeout(() => this.setState({ success: null }), 2000);
    });
  }

  _handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

}
