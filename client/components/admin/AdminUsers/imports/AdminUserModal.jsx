import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';

import AdminUserEditForm from './AdminUserEditForm';

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
        </Modal.Actions>
      </Modal>
    );
  }
}

AdminUserModal.propTypes = {
  user: PropTypes.object,
  clearUser: PropTypes.func.isRequired,
};

export default AdminUserModal;
