import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Container, Form, Message, Header, Icon, Button } from 'semantic-ui-react';

TeamCreator = class TeamCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    if (!this.props.user) {
      return this._renderLoading();
    }
    else if (this.props.user.teamId) {
      return this._renderAlreadyHasTeam();
    }
    return this._renderMain();
  }

  _renderLoading() {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  _renderAlreadyHasTeam() {
    return (
      <Container>
        <br/>
        <Message icon info>
          <Icon name='users' color='blue'/>
          <Message.Content>
            <Message.Header>Oops! It looks like you already have a team!</Message.Header>
            <br/>
            <Link to='/team'><Button icon='right arrow' labelPosition='right' content='Manage Your Team'/></Link>
          </Message.Content>
        </Message>
      </Container>
    );
  }

  _renderMain() {
    return (
      <Container>
        <PuzzlePageTitle title='Create a Team'/>
      </Container>
    );
  }

}

TeamCreator = createContainer((props) => {
  return {
    user: Meteor.user(),
  };
}, TeamCreator);
