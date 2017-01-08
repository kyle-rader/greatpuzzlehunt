import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Container, Segment, Grid, Form, Header, Icon, Message } from 'semantic-ui-react';

import { DIVISION_OPTS } from './imports/team-helpers.js';

const SORT_BY_OPTS = [
  { text: 'None', value: 'none' },
  { text: 'Last Updated', value: 'last-updated' },
  { text: 'Team Size', value: 'size' },
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
    if (nextProps.user && nextProps.user.teamId) {
      browserHistory.push('/team');
    }


  }

  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Join a Team' />
        <Segment basic>
          <Header as='h3' icon={<Icon name='options' color='violet'/>} content='Options'/>
          <Form>
            <Form.Group widths='equal'>
              <Form.Select label='Sort By' name='sortBy' options={SORT_BY_OPTS} value={this.state.sortBy} onChange={(e, data) => this._handleChange(e, data)}/>
              <Form.Select label='Division' name='division' options={DIVISION_OPTS} value={this.state.division} onChange={(e, data) => this._handleChange(e, data)}/>
            </Form.Group>
          </Form>
          { this.props.ready ? <TeamList teams={this.props.teams}/> : <Loading /> }
        </Segment>
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
  const user = Meteor.user();
  const teamsHandle = Meteor.subscribe('teams.browse');
  const ready = teamsHandle.ready();
  const teams = Teams.find({}).fetch();

  return {
    ready,
    user,
    teams,
  };
}, TeamBrowser);
