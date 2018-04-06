import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';

import AdminUserEditForm from './AdminUserEditForm';
import AdminUserActions from './AdminUserActions';

class AdminUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: Boolean(props.user),
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ open: Boolean(props.user) });
  }

  render() {
    const { user, clearUser } = this.props;
    const { open } = this.state;
    if (!open) return null;

    return (
      <Modal
        size="large"
        open={true}
        closeIcon={true}
        onClose={() => clearUser() }
      >
        <Modal.Header>{user.name}</Modal.Header>
        <Modal.Content>
          <AdminUserEditForm user={user}/>
        </Modal.Content>
        <Modal.Actions>
          <AdminUserActions
            user={user}
            onPasswordReset={(e) => this._sendPasswordReset(e)}
            onEmailResend={(e) => this._resendEmailVerification(e)}
            onDelete={(e) => this._deleteUser(e)}
            onToggleAdmin={(e) => this._toggleRole('admin')}
            onToggleVolunteer={(e) => this._toggleRole('volunteer')}
            onTogglePaid={(e) => this._togglePaid(e)}
            onVerifyEmail={(e) => this._verifyEmail(e)}
          />
        </Modal.Actions>
      </Modal>
    );
  }

  _sendPasswordReset(event) {
    if (!confirm(`Confirm Send Password Reset for "${this.props.user.name}" ?`))
      return;

    const btn = $(event.target);

    Meteor.call('admin.user.resetPassword', { _id: this.props.user._id }, (err, result) => {
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

  _resendEmailVerification(event) {
    if (!confirm(`Confirm Resend Verification email for "${this.props.user.name}" ?`))
      return;

    const btn = $(event.target);

    Meteor.call('admin.user.emailResend', this.props.user._id, (err, result) => {
      if (err) {
        console.log(err);
        btn.attr('data-content', `Send Failed! 😰 ${err.reason}`);
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

    Meteor.call('admin.user.delete', this.props.user._id, (err, result) => {
      if (err) {
        alert(err);
        btn.attr('data-content', 'Failed to delete user! 😰');
      }
    });
  }

  _toggleRole(role) {
    const { user } = this.props;
    if (!confirm(`Toggle ${role} for ${user.name} ?`)) return;

    Meteor.call('admin.user.toggleRole', user._id, role, (err, result) => {
      if (err) return alert(err);
    });
  }

  _togglePaid(e) {
    e.preventDefault();
    const { user } = this.props;
    if (!confirm(`Toggle Paid for ${user.name} ?`)) return;

    Meteor.call('admin.user.togglePaid', user._id, (err, result) => {
      if (err) return alert(err);
    });
  }


  _verifyEmail(e) {
    e.preventDefault();
    Meteor.call('admin.validateUser', this.props.user._id, (error, result) => {
      if (error) alert(error.reason);
    });
  }
}

AdminUserModal.propTypes = {
  user: PropTypes.object,
  clearUser: PropTypes.func.isRequired,
};

export default AdminUserModal;
