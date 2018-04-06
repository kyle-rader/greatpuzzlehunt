import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Container, Segment, Grid, Form, Header, Icon, Message } from 'semantic-ui-react';
import { filter, sortBy as sort } from 'lodash';
import moment from 'moment';

import { DIVISION_OPTS } from './imports/team-helpers.js';

const SORT_BY_OPTS = [
  { text: 'None', value: 'none' },
  { text: 'Last Updated', value: 'last-updated' },
  { text: 'Team Size', value: 'size' },
];
const { eventYear } = Meteor.settings.public;

TeamBrowser = class TeamBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'none',
      division: 'all',
      public: Boolean(this.props.public),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.public && nextProps.user && nextProps.user.teamId) {
      browserHistory.push('/team');
    }
  }

  render() {
    return (
      <Container>
        <PuzzlePageTitle title={this._getTitle()} />
        <Segment basic>
          <Header as='h3' icon={<Icon name='options' color='violet'/>} content='Options'/>
          <Form>
            <Form.Group widths='equal'>
              <Form.Select label='Sort By' name='sortBy' options={SORT_BY_OPTS} value={this.state.sortBy} onChange={(e, data) => this._handleChange(e, data)}/>
              <Form.Select label='Division' name='division' options={DIVISION_OPTS} value={this.state.division} onChange={(e, data) => this._handleChange(e, data)}/>
            </Form.Group>
          </Form>
          { this.props.ready ? <TeamList teams={this._getTeams()} public={this.state.public}/> : <Loading /> }
        </Segment>
      </Container>
    );
  }

  _getTitle() {
    return this.state.public ? `${eventYear} Teams` : 'Join a Team';
  }

  _handleChange(e, data) {
    const name = e.target.name || data.name;
    const value = e.target.value || data.value;

    this.setState({ [name]: value });
  }

  _getTeams() {
    const { sortBy, division } = this.state;
    let { teams } = this.props;

    // First filter down teams
    if (division !== 'all') {
      teams = filter(teams, (team) => team.division === division);
    }

    // Then sort filtered results.
    if (sortBy === 'size') {
      teams = sort(teams, (team) => (-team.members.length));
    }
    else if (sortBy === 'last-updated') {
      teams = sort(teams, (team) => (-moment(team.updatedAt).unix()));
    }

    return teams;
  }

}

TeamBrowser = withTracker((props) => {
  const user = Meteor.user();
  const teamsHandle = Meteor.subscribe('teams.browse');
  const ready = teamsHandle.ready();
  const teams = Teams.find({}).fetch();

  return {
    ready,
    user,
    teams,
  };
})(TeamBrowser);
