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
      invites: [],
    };
    this._checkProps(this.props);
    this.divisions = [
      { name: 'WWU Student (All members must be current WWU students)', value: 'wwu-student' },
      { name: 'WWU Alumni (Must have 4 or more alumni members)', value: 'wwu-alumni' },
      { name: 'Post-Secondary/Non-WWU college students', value: 'post-secondary' },
      { name: 'High School (Must all be current high school students)', value: 'high-school' },
      { name: 'Open (For mixed teams, community members, family, or anyone else!)', value: 'open' },
    ];

    this._handleChange = (e, { name: dataName, value: dataValue } = {}) => {
      const name = e.target.name || dataName;
      const value = e.target.value || dataValue;
      this.setState({ [name]: value });
    };
  }

  _checkProps(props) {
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
              <Form.Input name='name' label='Team Name' placeholder='Team Name' value={this.state.name} onChange={this._handleChange} />
              <Form.Input name='password' label='Team Password' placeholder='Team Password' value={this.state.password} onChange={this._handleChange} />
            </Form.Group>
            <Form.Field>
              <label>Team Division <br/><small>This determines your prize group</small></label>
              <br/>
              {this._renderDivisionRadio()}
            </Form.Field>
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

  _renderDivisionRadio() {
    return this.divisions.map((division) => (<Form.Radio key={division.value} label={division.name} name='division' value={division.value} checked={this.state.division === division.value} onChange={this._handleChange}/>));
  }

  _handleSubmit(e, formData) {
    e.preventDefault();

    const { name, password, division } = formData;

    if (!name) {
      return this.setState({ error: { reason: 'You must choose a Team Name' } });
    }
    else if (!password) {
      return this.setState({ error: { reason: 'You must make a Team Password' } });
    }
    else if (password.length < 6) {
      return this.setState({ error: { reason: 'Your Team Password must be at least 6 characters long' } });
    }
    else if (!this.state.division) {
      return this.setState({ error: { reason: 'You must select a team division' } });
    }

    Meteor.call('teams.upsert', formData, (error, result) => {
      if (error) return this.setState({ error });
    });
  }

}

TeamCreator = makeTeamComp(TeamCreator);
