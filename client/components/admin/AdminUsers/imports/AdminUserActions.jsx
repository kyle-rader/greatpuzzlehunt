import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

class AdminUserActions extends Component {
  render() {
    const {
      user,
      onEdit,
      onPasswordReset,
      onEmailResend,
      onDelete,
      onToggleAdmin,
      onToggleVolunteer,
      onTogglePaid,
      onVerifyEmail,
    } = this.props;
    return (
      <div>
        <Button basic
          color={ user.hasRole('admin') ? 'violet' : null }
          onClick={ onToggleAdmin }
          icon={ <Icon name='power'/> }
        />
        <Button basic
          color={ user.hasRole('volunteer') ? 'teal' : null }
          onClick={ onToggleVolunteer }
          icon={ <Icon name='heart'/> }
        />
        <Button basic
          content={ user.paid ? "Un-Pay" : "Pay" }
          color={ user.paid ? 'red' : 'green' }
          onClick={ onTogglePaid }
          icon={ <Icon name='ticket'/> }
        />
        <Button basic
          onClick={ onVerifyEmail }
          icon="check"
          content="Verify Email"
        />
        <Button basic
          onClick={onPasswordReset}
          icon="lock"
          color='blue'
          content="Password Reset"
        />
        <Button basic
          onClick={ onEmailResend }
          icon="mail"
          color='violet'
          content="Send Email Verification"
        />
        <Button basic
          onClick={ onDelete }
          icon='trash'
          color='red'
        />
      </div>
    );
  }

  _editIcon() {
    return this.props.editMode ? 'close' : 'pencil';
  }

  _editColor() {
    return this.props.editMode ? 'red' : 'green';
  }
}

AdminUserActions.propTypes = {
  user: PropTypes.object.isRequired,
  onPasswordReset: PropTypes.func.isRequired,
  onEmailResend: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleAdmin: PropTypes.func.isRequired,
  onToggleVolunteer: PropTypes.func.isRequired,
  onTogglePaid: PropTypes.func.isRequired,
  onVerifyEmail: PropTypes.func.isRequired,
};

export default AdminUserActions;
