import React, { Component } from 'react';
import { Link } from 'react-router';
import { Container, Grid, Form, Segment, Header, Message } from 'semantic-ui-react';

Login = class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      err: null,
      email: '',
      password: '',
    };
  }

  login(e) {
    e.preventDefault();

    const { email, password } = this.state;
    Meteor.loginWithPassword({ email }, password, (err) => {
      if (err) {
        this.setState({err: err});
      }
    });
  }

  getErrorMessage() {
    if (this.state.err) {
      return <div className="ui error message">{this.state.err.reason}</div>;
    }
    else {
      return null;
    }
  }

  _handleUsernameChange(e) {
    this.setState({ email: e.target.value });
  }

  _handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <Grid className="login" verticalAlign="middle" textAlign="center">
        <Grid.Column>
          <Form size="huge" onSubmit={(e) => this.login(e)}>
            <Segment raised>
              <Header color="blue">
                <Header.Content as="h2">
                  Log In
                </Header.Content>
              </Header>
              <Form.Input
                icon="user"
                iconPosition="left"
                type="text"
                name="email"
                placeholder="Email"
                autoComplete="off"
                value={this.state.email}
                onChange={(e, data) => this._handleUsernameChange(e, data)}
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="off"
                value={this.state.password}
                onChange={(e, data) => this._handlePasswordChange(e, data)}
              />
              <Form.Button fluid size="large" color="blue" type="submit" content="Login" />
            </Segment>
          </Form>
          {this.getErrorMessage()}

          <Message>
            <Link to="/register">Join The Puzzle Hunt!</Link> &nbsp; | &nbsp; <Link to="/requestpasswordreset">Forgot Password</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
