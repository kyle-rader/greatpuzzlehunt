import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Form, Icon, Message, Button } from 'semantic-ui-react';

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
        <Form.Input type='text' name='email' placeholder="Friend's Email" label="Friend's Email" value={this.state.email} onChange={(e) => this._handleChange(e)}/>
        <Form.Group>
          <Form.Button type='submit' content='Invite' icon='send' labelPosition='right'/>
          <Link to='looking-for-team'>
            <Button basic color='violet' content='Browse other players looking to join teams!'/>
          </Link>
        </Form.Group>
        <Message
         negative
         hidden={!this.state.error}
         icon="warning sign"
         onDismiss={() => this.setState({ error: null })}
         content={this.state.error ? this.state.error.reason : ''}
        />
      </Form>
    );
  }

  _handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  _handleSubmit(e, formData) {
    e.preventDefault();

    Meteor.call('teams.inviteMember', this.props.team, this.state.email.toLowerCase(), (error, result) => {
      if (error) return this.setState({ error });

      this.setState({ email: '', error: null });
    });
  }
}

TeamInviter.propTypes = {
  team: PropTypes.object.isRequired,
};
