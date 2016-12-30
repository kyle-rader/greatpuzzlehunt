import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Segment, Grid, Form, Icon } from 'semantic-ui-react';
import { makeTeamComp } from './imports/team-helpers.js';
import moment from 'moment';

TeamManager = class TeamManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUpdated: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.team) {
      this.setState({ lastUpdated: moment(nextProps.team.updatedAt).fromNow() });
    }
  }

  render() {
    const content = this.props.team ? this._renderMain() : <NoTeamMessage />;

    return (
      <Container>
        <PuzzlePageTitle title={this._getTitle()} subTitle={`Last Updated: ${this.state.lastUpdated}`}/>
        {content}
      </Container>
    );
  }

  _getTitle() {
    return this.props.team ? `Team: ${this.props.team.name}` : 'Team';
  }

  _renderMain() {
    return (
      <Segment basic>
        <TeamEditor showsSuccess={true} team={this.props.team}/>
      </Segment>
    );
  }
}

TeamManager = makeTeamComp(TeamManager);
