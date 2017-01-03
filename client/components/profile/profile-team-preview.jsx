import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Segment, Message, Header, Icon, Button } from 'semantic-ui-react';
import { makeTeamComp } from '../team/imports/team-helpers.js';

ProfileTeamPreview = class ProfileTeamPreview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const content = this.props.team ? this._renderWithTeam() : this._renderWithoutTeam();

    return (
      <Segment basic>
        <Header as="h3" icon={<Icon name="users" color="blue"/>} content="Team"/>
        {content}
      </Segment>
    );
  }

  _renderWithTeam() {
    const size = this.props.team.members.length;
    return (
      <Message info>
        <Message.Header>{this.props.team.name}</Message.Header>
        <Message.Content>
          <p>{size} team member{size > 1 ? '' : 's'}.</p>
          <Link to='/team'><Button content='View Team'/></Link>
        </Message.Content>
      </Message>
    );
  }

  _renderWithoutTeam() {
    return <NoTeamMessage />;
  }

}

ProfileTeamPreview = makeTeamComp(ProfileTeamPreview);
