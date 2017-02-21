import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Grid, Button, Icon } from 'semantic-ui-react';

import AdminUserEdit from './admin-user-edit';
import AdminUserDisplay from './admin-user-display';
import Actions from './actions';

class AdminUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
  }

  render() {
    const { user } = this.props;
    return (
      <Grid.Row>
        <Grid.Column computer={13} mobile={16}>
          {
            this.state.editMode ?
            <AdminUserEdit user={ user }/> :
            <AdminUserDisplay
              user={ user }
              onToggleAdmin={ (e) => this._toggleRole('admin') }
              onToggleVolunteer={ (e) => this._toggleRole('volunteer') }
            />
          }
        </Grid.Column>
        <Grid.Column computer={3} mobile={16}>
          <Actions
            onEdit={ (e) => this._toggleEdit() }
            onPasswordReset={(e) => this._sendPasswordReset(e)}
            onEmailResend={(e) => this._sendEmailResend(e)}
            onDelete={ (e) => this._deleteUser(e) }
          />
        </Grid.Column>
      </Grid.Row>
    );
  }

  _toggleRole(role) {
    const { user } = this.props;
    if (!confirm(`Toggle ${role} for ${user.name} ?`)) return;

    Meteor.call('admin.user.toggleRole', user._id, role, (err, result) => {
      if (err) return alert(err);
    });
  }

  _toggleEdit(state = null) {
    const newState = state !== null ? Boolean(state) : !this.state.editMode
    this.setState({ editMode: newState });
  }

  _sendPasswordReset(event) {
    if (!confirm(`Confirm Send Password Reset for "${this.props.user.name}" ?`))
      return;

    const btn = $(event.target);

    Meteor.call('userAdminResetPassword', { _id: this.props.user._id }, (err, result) => {
      if (err) {
        console.log(err);
        btn.attr('data-content', 'Failed to send password reset email! 😰');
      } else {
        btn.attr('data-content', 'Password Reset Email Sent! 😀');
      }

      btn.popup({
        on: 'manual'
      }).popup('show');

      Meteor.setTimeout(() => {
        btn.popup('hide');
      }, 2500);
    });
  }

  _sendEmailResend(event) {
    if (!confirm(`Confirm Resend Enrollment/Verification email for "${this.props.user.name}" ?`))
      return;

    const btn = $(event.target);

    Meteor.call('user.emailResend', this.props.user._id, (err, result) => {
      if (err) {
        console.log(err);
        btn.attr('data-content', 'Send Failed! 😰');
      } else {
        btn.attr('data-content', 'Email Sent! 😀');
      }

      btn.popup({
        on: 'manual'
      }).popup('show');

      Meteor.setTimeout(() => {
        btn.popup('hide');
      }, 2500);
    });
  }

  _deleteUser(event) {
    if (!confirm(`Confirm DELETE "${this.props.user.name}" !?!?`))
      return;

    let btn = $(event.target);

    Meteor.call('userAdminDelete', this.props.user._id, (err, result) => {
      if (err) {
        alert(err);
        btn.attr('data-content', 'Failed to delete user! 😰');
      }
    });
  }

  componentWillReceiveProps() {
    this.setState({ editMode: false });
  }
}

AdminUser.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AdminUser;
