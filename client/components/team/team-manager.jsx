import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Segment, Grid, Form, Icon } from 'semantic-ui-react';
import { makeTeamComp } from './imports/team-helpers.js';

TeamManager = class TeamManager extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const content = this.props.team ? this._renderMain() : <NoTeamMessage />;

    return (
      <Container>
        <PuzzlePageTitle title={this._getTitle()} />
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
