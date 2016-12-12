import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Header, Grid, Segment, Form, Message } from 'semantic-ui-react';

RequestPasswordReset = class RequestPasswordReset extends Component {

    constructor(props) {
      super(props);
      this.state = {
        error: null,
        username: '',
      };
    }

    render() {
      return (
      <Grid className="request-password-reset" textAlign='center' verticalAlign='middle'>
        <Grid.Row columns="1">
          <Grid.Column>
            <Segment raised>
              <Form onSubmit={(e) => this._handleSubmit(e)}>
                <Header as="h2" color="violet" content="Request Password Reset"/>
                <Form.Input name="username" placeholder="Username" value={this.state.username} onChange={(e) => this._handleChange(e)}/>
                <Form.Button type='submit' color='violet' content='Reset' fluid/>
                <Message
                  negative
                  hidden={!this.state.error}
                  icon="warning sign"
                  onDismiss={() => this.setState({ error: null })}
                  content={this.state.error ? this.state.error.reason : ''}
                />
                <Message
                  positive
                  hidden={!this.state.email}
                  icon="mail"
                  onDismiss={() => this.setState({ email: null })}
                  content={`A password reset email has been sent to ${this.state.email}`}
                />
              </Form>
            </Segment>

            <Message>
              <Link to="/login">Log In</Link>
            </Message>
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

      // Call Meteor method to create account.
      Meteor.call('user.passwordReset', this.state.username, (error, result) => {
        if (error) return this.setState({ error });

        this.setState({ error: null, email: result.email, username: '' });
      });
    }
}
