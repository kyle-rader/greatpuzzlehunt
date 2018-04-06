import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Container, Segment, Form, Message, Header, Icon, Button } from 'semantic-ui-react';
import { makeTeamComp } from './imports/team-helpers.js';

TeamCreator = class TeamCreator extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this._checkProps(this.props);
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
          <TeamEditor showsSuccess={false} team={this.props.team} />
        </Segment>
      </Container>
    );
  }

}

TeamCreator = makeTeamComp(TeamCreator);
