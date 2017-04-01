import React, { Component, PropTypes } from 'react';
import { Button, Icon } from 'semantic-ui-react';

class Actions extends Component {
  render() {
    const {
      user,
      onEdit,
      onPasswordReset,
      onEmailResend,
      onDelete,
      onToggleAdmin,
      onToggleVolunteer,
      onVerifyEmail,
    } = this.props;
    return (
      <div>
        <p>
          <Button basic size='small'
            color={ user.hasRole('admin') ? 'violet' : null }
            onClick={ onToggleAdmin }
            icon={ <Icon name='power'/> }
          />
          <Button basic size='small'
            color={ user.hasRole('volunteer') ? 'teal' : null }
            onClick={ onToggleVolunteer }
            icon={ <Icon name='heart'/> }
          />
          <Button basic size='small'
            onClick={ onVerifyEmail }
            icon={ <Icon name='check'/> }
          />
        </p>
        <p>
          <Button basic size='small'
            icon={this._editIcon()}
            color={this._editColor()}
            onClick={ onEdit }
          />
          <Button basic size='small' color='blue' onClick={ onPasswordReset }>
            <Icon.Group>
              <Icon name='lock'/>
              <Icon name='repeat' corner/>
            </Icon.Group>
          </Button>
          <Button basic size='small' color='violet' onClick={ onEmailResend }>
            <Icon.Group>
              <Icon name='mail'/>
              <Icon name='repeat' corner/>
            </Icon.Group>
          </Button>
          <Button basic size='small'
            icon='trash'
            color='red'
            onClick={ onDelete }
          />
        </p>
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

Actions.propTypes = {
  user: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onPasswordReset: PropTypes.func.isRequired,
  onEmailResend: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  onToggleAdmin: PropTypes.func.isRequired,
  onToggleVolunteer: PropTypes.func.isRequired,
  onVerifyEmail: PropTypes.func.isRequired,
};

export default Actions;
