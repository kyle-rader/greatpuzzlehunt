import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Container, Form, Message, Grid, Header, Icon } from 'semantic-ui-react';
import { debounce } from 'lodash';

const USERNAME_MIN_LENGTH = 4;
const PASSWORD_MIN_LENGTH = 6;

AccountSetup = class AccountSetup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      validToken: true,
      email: '',
      username: '',
      password1: '',
      password2: '',
      error: null,
      success: null,
    };

    this._getUser(props.params.token);

  }

  _getUser(token) {
    Meteor.call('findUserByToken', token, (error, result) => {
      if (error) {
        this.setState({ validToken: false, error });
      } else  if (result) {
        this.setState({ user: result, email: result.email });
      } else {
        this.setState({ validToken: false });
      }
    });
  }

  render() {
    if (this.state.success) {
      return this._renderSuccess();
    }
    if (this.state.validToken) {
      return this._renderMain();
    } else {
      return this._renderBadToken();
    }
  }

  _renderSuccess() {
    return (
    <Container>
      <PuzzlePageTitle title={'Almost Done!'} subTitle="Last step: Verify your new email address" />
      <Grid>
        <Grid.Row>
          <Grid.Column mobile="16" tablet="14" computer="10" widescreen="8" largeScreen="6">
            <Message positive icon>
              <Icon name='mail'/>
              <Message.Content>
                <Message.Header>We've sent a verification email to <i>{this.state.email}</i></Message.Header>
                <p>Once you verify your email you can log in and create or join a team!</p>
              </Message.Content>
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    );
  }

  _renderMain() {
    return (
    <Container>
      <PuzzlePageTitle title={this._title()} subTitle="After setting a Username and Password you can start building your team or find one to join!" />
      <Grid>
        <Grid.Row>
          <Grid.Column mobile="16" tablet="14" computer="10" widescreen="8" largeScreen="6">
            <Form size="large" onSubmit={(e, data) => this._handleSubmit(e, data)}>
              <Header as="h2">
                <Icon name="settings" color="green"/>
                <Header.Content>Account Setup</Header.Content>
              </Header>

              <Form.Input label="Your Email" name="email" placeholder="Email" value={this.state.email} onChange={(e) => this._handleChange(e)}/>

              <Form.Input label="Choose a Username" name="username" placeholder="Username" value={this.state.username} onChange={(e) => this._handleChange(e)}/>

              <Form.Input label="Choose a Password" type="password" name="password1" placeholder="Password" value={this.state.password1} onChange={(e) => this._handleChange(e)}/>
              <Form.Input label="Confirm Password" type="password" name="password2" placeholder="Confirm Password" value={this.state.password2} onChange={(e) => this._handleChange(e)}/>

              <Form.Button type="submit" color="green">Submit</Form.Button>

              <Message
                negative
                hidden={!Boolean(this.state.error)}
                icon="warning"
                content={this.state.error ? this.state.error.reason : ''}
                size="small"
              />

            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    );
  }

  _renderBadToken() {
    return (
      <Container>
        <PuzzlePageTitle title="Sorry this token is no longer valid" />
      </Container>
    );
  }

  _title() {
    const { name = '' } = this.state.user || {};
    return `Welcome ${name}!`;
  }

  _handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  _handleSubmit(e, formData) {
    e.preventDefault();
    const { email, username, password1, password2 } = this.state;
    const { token } = this.props.params;
    const fields = {
      email,
      username,
      password1,
      password2,
      token,
    };

    Meteor.call('setupAccount', fields, (error, result) => {
      if (error) return this.setState({ error });

      if (result.login) {
        Meteor.loginWithPassword({ username }, password1, (error2) => {
          if (error2) return this.setState({ error: error2 });

          browserHistory.push('/profile');
        });
      } else {
        this.setState({ user: null, success: true });
      }
    });
  }

}
