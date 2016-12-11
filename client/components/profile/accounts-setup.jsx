import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Form, Grid, Header, Icon } from 'semantic-ui-react';

AccountSetup = class AccountSetup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      validToken: true,
      username: '',
      password1: '',
      password2: '',
    };

    this._getUser(props.params.token);
  }

  _getUser(token) {
    Meteor.call('findUserByToken', token, (err, result) => {
      if (err) {
        this.setState({ validToken: false, err });
      } else {
        this.setState({ user: result });
      }
    });
  }

  _title() {
    const { name = '' } = this.state.user || {};
    return `Welcome ${name}!`;
  }

  _handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  _handleSubmit(e, formData) {
    e.preventDefault();
    // Ready to call Meteor method to setup account.
  }

  render() {
    return (
    <Container>
      <PuzzlePageTitle title={this._title()} subTitle="After setting a Username and Password you can start building your team or find one to join!" />
      <Grid>
        <Grid.Row>
          <Grid.Column mobile="16" tablet="14" computer="10" widescreen="8" largeScreen="6">
            <Form size="large" error={true} onSubmit={(e, data) => this._handleSubmit(e, data)}>
              <Header as="h2">
                <Icon name="settings" color="green"/>
                <Header.Content>Account Setup</Header.Content>
              </Header>
              <Form.Input label="Choose a Username" name="username" placeholder="Username" value={this.state.username} onChange={(e) => this._handleChange(e)}/>

              <Form.Input label="Choose a Password" name="password1" placeholder="Password" value={this.state.password1} onChange={(e) => this._handleChange(e)}/>
              <Form.Input label="Confirm Password" name="password2" placeholder="Confirm Password" value={this.state.password2} onChange={(e) => this._handleChange(e)}/>

              <Form.Button type="submit" color="green">Submit</Form.Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    );
  }

}
