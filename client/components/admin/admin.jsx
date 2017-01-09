import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Container, Icon, Menu } from 'semantic-ui-react';

Admin = class Admin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Authed accessLevel='admin'>
        <Container>
          <PuzzlePageTitle title="Admin" />
          <Menu icon="labeled">
            <Link className="item" to="/admin/users">
              <Icon className="green user icon"></Icon>
              Users
            </Link>
            <Link className="item" to="/admin/teams">
              <Icon className="blue users icon"></Icon>
              Teams
            </Link>
            <Link className="item" to="/admin/puzzles">
              <Icon className="violet puzzle icon"></Icon>
              Puzzles
            </Link>
            <Link className="item" to="/admin/email">
              <Icon className="orange mail icon"></Icon>
              Email
            </Link>
            <Link className="item" to="/admin/game">
              <Icon className="red gamepad icon"></Icon>
              The Game
            </Link>
            <Link className="item" to="/admin/scoring">
              <Icon className="yellow trophy icon"></Icon>
              Scoring
            </Link>
          </Menu>

          {this.props.children}

        </Container>
      </Authed>
    );
  }
}
