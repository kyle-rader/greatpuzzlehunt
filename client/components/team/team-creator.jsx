import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Container, Form, Message, Header, Icon, Button } from 'semantic-ui-react';
import { makeTeamComp } from './imports/team-helpers.js';

TeamCreator = class TeamCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    console.log('Getting new props', nextProps);
  }

  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Create a Team'/>
      </Container>
    );
  }
}

TeamCreator = makeTeamComp(TeamCreator);
