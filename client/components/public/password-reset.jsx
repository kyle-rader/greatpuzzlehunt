import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

// Reset Password comp

PasswordReset = class PasswordReset extends Component {

  constructor(props) {
    super(props);
    this.state = {
      err: null
    };
  }

  componentDidMount() {
    let form = $(this.refs.resetForm);

    // Init form validation and submission
    $(form).form({
      fields: {
        password: {
          identifier: 'password',
          rules: [{
            type: 'empty',
            prompt: 'Enter a password'
          },
          {
            type: 'minLength[6]',
            prompt: 'Min length of 6!'
          }]
        },
        confirmPassword: {
          identifier: 'confirmPassword',
          rules: [{
            type: 'match[password]',
            prompt: 'Passwords do not match!'
          }]
        }
      },
      inline: true,
      onSuccess: (event, fields) => {
        event.preventDefault();

        // Reset Password
        Accounts.resetPassword(this.props.token, fields.password, (err, result) => {
          if (err) {
            this.setState({err: err});
          } else {
            FlowRouter.go('/team');
          }
        });
      }
    });
  }

  getErrorMsg() {
    if (this.state.err) {
      return (
      <div className="ui error message">
        {this.state.err.reason}
      </div>);
    }
  }

  getForm() {
    return (
    <form id="resetForm" className="ui huge form" ref="resetForm">
      <div className="ui raised segment transparent-bg">
        <h2 className="ui orange header">
          <div className="content">
            Choose a New Password
          </div>
        </h2>

        <div className="field">
          <div className="ui left icon input">
            <i className="lock icon"></i>
            <input type="password" name="password" placeholder="Password" autoComplete="off" defaultValue={this.state.password}/>
          </div>
        </div>
        <div className="field">
          <div className="ui left icon input">
            <i className="lock icon"></i>
            <input type="password" name="confirmPassword" placeholder="Confirm Password" autoComplete="off" defaultValue={this.state.confirmPassword}/>
          </div>
        </div>

        <input className="ui fluid large orange submit button" type="submit" value="Reset" />
      </div>
    </form>
    );
  }

  render() {

    return (
    <div className="password-reset ui middle aligned center aligned grid custom-bg red-square">
        <div className="column">

            {this.getForm()}
            {this.getErrorMsg()}

            <div className="ui message">
              <Link to="/login">Log In</Link>
            </div>
        </div>
    </div>
    );
  }
}
