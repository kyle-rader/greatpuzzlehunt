import React, { Component } from 'react';
import { Link } from 'react-router';
import { Icon, Menu, Button } from 'semantic-ui-react'
import { Meteor } from 'meteor/meteor';

Admin = class Admin extends Component {
  componentDidMount() {
      $(this.refs.tabMenu).find('.item').tab();
  }

  render() {
    return (
      <Authed accessLevel='admin'>
        <div className="ui container">
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
        </div>
      </Authed>
    );
  }
}
