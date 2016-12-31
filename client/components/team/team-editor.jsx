import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Form, Message } from 'semantic-ui-react';

TeamEditor = class TeamEditor extends Component {

  constructor(props) {
    super(props);
    this.state = this._getStateFromProps(props);

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

  _getStateFromProps(props) {
    if (props.team) {
      return _.pick(props.team, ['name', 'password', 'division']);
    }
    return { name: '', password: '', division: null };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._getStateFromProps(nextProps));
  }

  render() {
    return (
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
        <Form.Button color='blue' type='submit'>{this.props.team ? 'Save' : 'Create'} Team</Form.Button>
        <Message
         negative
         hidden={!this.state.error}
         icon="warning sign"
         onDismiss={() => this.setState({ error: null })}
         content={this.state.error ? this.state.error.reason : ''}
        />
        <Message
         positive
         hidden={!this.state.success || !this.props.showsSuccess}
         icon="check"
         content={this.state.success}
        />
      </Form>
    );
  }

  _renderDivisionRadio() {
    return this.divisions.map((division) => (<Form.Radio key={division.value} label={division.name} name='division' value={division.value} checked={this.state.division === division.value} onChange={this._handleChange}/>));
  }

  _handleSubmit(e, formData) {
    e.preventDefault();

    const { name, password, division } = formData;
    if (this.props.team) {
      formData._id = this.props.team._id;
    }

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

      if (this.props.showsSuccess) {
        this.setState({ success: 'Team Saved!', error: null });
        Meteor.setTimeout(() => this.setState({ success: null }), 2000);
      }
    });
  }

}