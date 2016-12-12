import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Header, Form, Message, Icon } from 'semantic-ui-react';
import { extend, pick } from 'lodash';

ProfileEditor = class ProfileEditor extends Component {
  constructor(props) {
    super(props);
    this.state = extend({
      edit: false,
    }, this._makeStateFromProps(props));
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._makeStateFromProps(nextProps));
  }

  _makeStateFromProps(props) {
    const { user = {} } = props;
    return {
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      username: user.username || '',
      email: user.getEmail(),
      phone: user.phone || '',
    };
  }

  render() {
    return (
    <Form onSubmit={(e) => this._handleSubmit(e)}>
      <Header as='h3' content='Account' icon='user' />
      <Form.Group widths='equal'>
        <Form.Input name='firstname' label='First Name' placeholder='First name' value={this.state.firstname} onChange={(e) => this._handleChange(e)} />
        <Form.Input name='lastname' label='Last Name' placeholder='Last name' value={this.state.lastname} onChange={(e) => this._handleChange(e)} />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Input name='username' label='Username' placeholder='Username' value={this.state.username} onChange={(e) => this._handleChange(e)} />
        <Form.Input name='phone' label='Phone Number' placeholder='1112223333' value={this.state.phone} onChange={(e) => this._handleChange(e)} />
      </Form.Group>
      <Form.Button type='submit' color="green" content="Save"/>
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
    );
  }

  _handleSubmit(e) {
    e.preventDefault();

    const fields = pick(this.state, ['firstname', 'lastname', 'username', 'phone']);

    Meteor.call('user.update.account', fields, (error, result) => {
      if (error) return this.setState({ error });

      this.setState({ success: 'Account Saved!', error: null });
      Meteor.setTimeout(() => this.setState({ success: null }), 2000);
    });
  }

  _handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

}

ProfileEditor.propTypes = {
  user: React.PropTypes.object.isRequired,
};
