import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Grid, Form, Icon } from 'semantic-ui-react';
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
        <PuzzlePageTitle title='Team' />
        {content}
      </Container>
    );
  }

  _renderMain() {
    return (
      <h3>Team manager UI</h3>
    );
  }
}

TeamManager = makeTeamComp(TeamManager);
