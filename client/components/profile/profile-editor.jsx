import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Segment, Header, Form, Message, Icon, Checkbox } from 'semantic-ui-react';
import { extend, pick } from 'lodash';

ProfileEditor = class ProfileEditor extends Component {
  constructor(props) {
    super(props);
    this.state = extend({
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
      lookingForTeam: user.lookingForTeam || false,
      bio: user.bio || '',
    };
  }

  render() {
    const { firstname, lastname, username, phone, lookingForTeam, bio } = this.state;
    return (
    <Segment basic>
      <Form onSubmit={(e) => this._handleSubmit(e)}>
        <Header as='h3' content='Account' icon={<Icon name='user' color='green' />} />
        <Form.Group widths='equal'>
          <Form.Input name='firstname' label='First Name' placeholder='First name' value={firstname} onChange={(e) => this._handleChange(e)} />
          <Form.Input name='lastname' label='Last Name' placeholder='Last name' value={lastname} onChange={(e) => this._handleChange(e)} />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='username' label='Username' placeholder='Username' value={username} onChange={(e) => this._handleChange(e)} />
          <Form.Input name='phone' label='Phone Number' placeholder='1112223333' value={phone} onChange={(e) => this._handleChange(e)} />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Field>
            <label>Looking for a team?</label>
            <Checkbox toggle name='lookingForTeam' label='List me on the looking for team page' checked={ lookingForTeam } onChange={(e,data) => this._handleDataChange(e,data)} />
          </Form.Field>
          <Form.Input name='bio' label='Short Bio' placeholder='I am ...' value={ bio } onChange={(e) => this._handleChange(e)} />
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
    </Segment>
    );
  }

  _handleSubmit(e) {
    e.preventDefault();

    const fields = pick(this.state, ['firstname', 'lastname', 'username', 'phone', 'lookingForTeam', 'bio']);

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

  _handleDataChange(e,data) {
    const { name, value, checked } = data;
    this.setState({ [name]: (value || checked) });
  }

}

ProfileEditor.propTypes = {
  user: React.PropTypes.object.isRequired,
};
