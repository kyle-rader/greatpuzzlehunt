import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, browserHistory } from 'react-router';
import { Header, Grid, Segment, Form, Message } from 'semantic-ui-react';

const PASSWORD_MIN_LENGTH = 6;

PasswordReset = class PasswordReset extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmPassword: '',
    };
  }

  render() {
    return (
    <Grid className='password-reset' textAlign='center' verticalAlign='middle'>
      <Grid.Row columns='1'>
        <Grid.Column>
          <Segment raised>
            <Form onSubmit={(e) => this._handleSubmit(e)}>
              <Header as='h2' color='orange' content='Reset Password'/>
              <Form.Input name='newPassword' icon='lock' iconPosition='left' placeholder='Password' type="password" value={this.state.newPassword} onChange={(e) => this._handleChange(e)}/>
              <Form.Input name='confirmPassword' icon='lock' iconPosition='left' placeholder='Confirm Password' type="password" value={this.state.confirmPassword} onChange={(e) => this._handleChange(e)}/>
              <Form.Button type='submit' color='orange' content='Reset' fluid/>
              <Message
                negative
                hidden={!this.state.error}
                icon='warning sign'
                onDismiss={() => this.setState({ error: null })}
                content={this.state.error ? this.state.error.reason : ''}
              />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>);
  }

  _handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  _handleSubmit(e) {
    e.preventDefault();

    const { newPassword, confirmPassword } = this.state;

    if (newPassword.length < PASSWORD_MIN_LENGTH) {
      return this.setState({ error: {
        reason: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long!`,
      }});
    } else if (newPassword !== confirmPassword) {
      return this.setState({ error: {
        reason: 'Password do not match!',
      }});
    }

    // Call Meteor method to create account.
    Accounts.resetPassword(this.props.params.token, newPassword, (error, result) => {
      if (error) return this.setState({ error });

      browserHistory.push('/profile');
    });
  }
}
