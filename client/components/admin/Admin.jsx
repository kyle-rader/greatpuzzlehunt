import React, { Component } from 'react';
import { Link } from 'react-router';
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
          <div className="ui labeled icon menu">
            <Link className="item" to="/admin/users">
              <i className="green user icon"></i>
              Users
            </Link>
            <Link className="item" to="/admin/teams">
              <i className="blue users icon"></i>
              Teams
            </Link>
            <Link className="item" to="/admin/puzzles">
              <i className="violet puzzle icon"></i>
              Puzzles
            </Link>
            <Link className="item" to="/admin/email">
              <i className="orange mail icon"></i>
              Email
            </Link>
            <Link className="item" to="/admin/game">
              <i className="red gamepad icon"></i>
              The Game
            </Link>
            <Link className="item" to="/admin/scoring">
              <i className="yellow trophy icon"></i>
              Scoring
            </Link>
          </div>
          {this.props.children}
        </div>
      </Authed>
    );
  }
}
