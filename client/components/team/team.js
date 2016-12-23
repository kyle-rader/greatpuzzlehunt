import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Container, Form, Message, Header, Icon, Button } from 'semantic-ui-react';

Team = class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let content = null;

    if (!this.props.user) {
      content = <Loading />;
    } else if (!this.props.user.teamId) {
      content = <NoTeamMessage/>;
    } else {
      content = <TeamManager user={this.props.user} />;
    }

    return (
      <Container>
        <PuzzlePageTitle title='Team' />
        {content}
      </Container>
    );
  }

}

Team = createContainer((props) => ({
  user: Meteor.user(),
}), Team);
