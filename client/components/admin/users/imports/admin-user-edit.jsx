import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Grid, Form, Message } from 'semantic-ui-react';

class AdminUserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.user.getEmail() || '',
      error: null,
    }
  }

  render() {
    const { user } = this.props;
    return (
      <Form onSubmit={(e) => this._handleSubmit(e)}>
        <Form.Input fluid name='email' value={ this.state.email } onChange={(e) => this._handleChange(e)}/>
        <Form.Button type='submit' basic color='green' content='Save'/>
        { this._error() }
      </Form>
    );
  }

  _handleSubmit(e) {
    e.preventDefault();
    const userId = this.props.user._id;
    const { email } = this.state;
    Meteor.call('admin.user.updateEmail', userId, email, (error, result) => {
      if (error) return this.setState({ error });

      console.log(`Saved ${userId} with email ${email}`);
    });
  }

  _handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  _error() {
    const { error } = this.state;
    if (!error) return null;

    return (
      <Message negative content={error.reason}/>
    );
  }
}

AdminUserEdit.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AdminUserEdit;
