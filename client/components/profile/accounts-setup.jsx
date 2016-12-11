import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Form, Grid, Header, Icon } from 'semantic-ui-react';

AccountSetup = class AccountSetup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      validToken: true,
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
    return `Welcome ${name},`;
  }

  render() {
    return (
    <Container>
      <PuzzlePageTitle title={this._title()} subTitle="After setting a Username and Password you can log in and build your team!" />
      <Grid>
        <Grid.Row>
          <Grid.Column mobile="16" >
            <Form size="large" error={true}>
              <Header as="h2">
                <Icon name="settings" color="green"/>
                <Header.Content>Setup your Login</Header.Content>
              </Header>
              <Form.Input label="Choose a Username" name="username" placeholder="Username" />

              <Form.Input label="Choose a Password" name="password1" placeholder="Password" />
              <Form.Input label="Confirm Password" name="password2" placeholder="Confirm Password" />

            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    );
  }

}
