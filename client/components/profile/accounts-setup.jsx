import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Form, Grid } from 'semantic-ui-react';

AccountSetup = class AccountSetup extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
    <Container>
      <PuzzlePageTitle title="Account Setup" subTitle="Welcome to Great Puzzle Hunt.  Please finish setting up your account :)" />
      <Grid>
        <Grid.Row>
          <Grid.Column mobile="16" >
            <Form size="big">
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
