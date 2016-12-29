import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Container, Segment, Form, Message, Header, Icon, Button } from 'semantic-ui-react';
import { makeTeamComp } from './imports/team-helpers.js';

import { createContainer } from 'meteor/react-meteor-data';

TeamCreator = class TeamCreator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      division: '',
      divisionSelected: false,
      invites: [],
    };
    this._checkProps(this.props);
    this.divisions = [
      { text: 'WWU Student', value: 'wwu-student' },
      { text: 'WWU Alumni', value: 'wwu-alumni' },
      { text: 'Post-Secondary', value: 'post-secondary' },
      { text: 'High School', value: 'high-school' },
      { text: 'Open', value: 'open' },
    ];
  }

  _checkProps(props) {
    console.log('Checking props', props);
    if (props.team) {
      browserHistory.push('/team');
    }
  }

  componentWillReceiveProps(nextProps) {
    this._checkProps(nextProps);
  }

  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Create a Team'/>
        <Segment basic>
          <Form widths='equal' size='big' onSubmit={(e, data) => this._handleSubmit(e, data)}>
            <Form.Group>
              <Form.Input name='name' label='Team Name' placeholder='Team Name' value={this.state.name} onChange={(e) => this._handleChange(e)} />
              <Form.Input name='password' label='Team Password' placeholder='Team Password' value={this.state.password} onChange={(e) => this._handleChange(e)} />
            </Form.Group>
            <Form.Select name='division' label='Team Dvision' placeholder='Select a Division' options={this.divisions} onChange={(e) => this._handleChange(e)}/>
            <Form.Button color='blue' type='submit'>Create Team</Form.Button>
          </Form>
          <Message
           negative
           hidden={!this.state.error}
           icon="warning sign"
           onDismiss={() => this.setState({ error: null })}
           content={this.state.error ? this.state.error.reason : ''}
          />
        </Segment>
      </Container>
    );
  }

  _handleSubmit(e, formData) {
    e.preventDefault();

    const { name, password, division } = formData;
    console.log(formData);

    if (!name) {
      return this.setState({ error: { reason: 'You must choose a Team Name' } });
    }
    else if (!password) {
      return this.setState({ error: { reason: 'You must make a Team Password' } });
    }
    else if (password.length < 6) {
      return this.setState({ error: { reason: 'Your Team Password must be at least 6 characters long' } });
    }
    else if (!this.state.divisionSelected) {
      return this.setState({ error: { reason: 'You must select a team division' } });
    }

    // Meteor.call('user.update.account', fields, (error, result) => {
    //   if (error) return this.setState({ error });

    //   this.setState({ success: 'Account Saved!', error: null });
    //   Meteor.setTimeout(() => this.setState({ success: null }), 2000);
    // });
  }

  _handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    console.log(`${name} has changed to ${value}`, e);

    if (name === 'division' && !this.state.divisionSelected) {
      this.setState({ divisionSelected: true });
    }
  }

}

TeamCreator = makeTeamComp(TeamCreator);
