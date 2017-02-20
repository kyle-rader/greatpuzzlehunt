import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Grid, Form } from 'semantic-ui-react';

class AdminUserEdit extends Component {
  render() {
    return <div>
      Edit form for { this.props.user.name }
    </div>
  }
}

AdminUserEdit.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AdminUserEdit;
