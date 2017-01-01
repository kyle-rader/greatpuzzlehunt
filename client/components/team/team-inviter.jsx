import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Form, Icon, Message } from 'semantic-ui-react';

TeamInviter = class TeamInviter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  render() {
    if (this.props.team.members.length < 6) {
      return this._renderInviteForm();
    }
    return <Message info icon='info' content='Your has the max (6) members! You cannot send any more invites right now'/>
  }

  _renderInviteForm() {
    return (
      <Form onSubmit={(e, d) => this._handleSubmit(e, d)}>
        <Form.Input type='text' name='email' label="Friend's Email" value={this.state.email} onChange={(e) => this._handleChange(e)}/>
        <Form.Button type='submit' content='Invite'/>
      </Form>
    );
  }

  _handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  _handleSubmit(e, formData) {

  }
}

TeamInviter.propTypes = {
  team: React.PropTypes.object.isRequired,
};
