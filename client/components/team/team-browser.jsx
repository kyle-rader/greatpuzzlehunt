import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Container, Grid, Form, Icon, Message } from 'semantic-ui-react';

const SORT_BY_OPTS = [
  { text: 'None', value: 'none' },
  { text: 'Last Updated', value: 'last-updated' },
  { text: 'Team Size', value: 'size' },
];

const DIVISION_OPTS = [
  { text: 'All', value: 'all' },
  { text: 'WWU Student', value: 'wwu-student' },
  { text: 'WWU Alumni', value: 'wwu-alumni' },
  { text: 'Post-Secondary/Non-WWU college', value: 'post-secondary' },
  { text: 'High School', value: 'high-school' },
  { text: 'Open', value: 'open' },
];

TeamBrowser = class TeamBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'none',
      division: 'all',
    };

  }

  componentWillReceiveProps(nextProps) {
    // Needto add team filtering and sorting here.
  }

  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Join a Team' />
        <Form>
          <Form.Group widths='equal'>
            <Form.Select label='Sort By' name='sortBy' options={SORT_BY_OPTS} value={this.state.sortBy} onChange={(e, data) => this._handleChange(e, data)}/>
            <Form.Select label='Division' name='division' options={DIVISION_OPTS} value={this.state.division} onChange={(e, data) => this._handleChange(e, data)}/>
          </Form.Group>
        </Form>
      </Container>
    );
  }

  _handleChange(e, data) {
    const name = e.target.name || data.name;
    const value = e.target.value || data.value;

    this.setState({ [name]: value });
  }
}

TeamBrowser = createContainer((props) => {
  const teamsHandle = Meteor.subscribe('teams.browse');
  const ready = teamsHandle.ready();
  const teams = Teams.find({}).fetch();

  return {
    ready,
    teams,
  };
}, TeamBrowser);
