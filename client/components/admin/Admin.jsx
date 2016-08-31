import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import UserList from './UserList.jsx';
import TeamList from './TeamList.jsx';
import PuzzleDashboard from './PuzzleDashboard.jsx';
import BulkEmail from './BulkEmail.jsx';
import GamePlay from './GamePlay.jsx';
import Scoreing from './Scoring.jsx';

Admin = class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageComp: Scoring //UserList
    }
  }

  componentDidMount() {
      $(this.refs.tabMenu).find('.item').tab();
  }

  setPage(targetPage) {
      this.setState({
          pageComp: targetPage
      });
  }

  render() {

    let pageComp = this.state.pageComp ? <this.state.pageComp /> : <div className="basic segment">Oops, no page found</div>;

    return (
      <AuthedComponentContainer params={{accessLevel: 'admin'}}>
        <div className="ui container">
          <PuzzlePageTitle title="Admin" />
          <div className="ui labeled icon menu">
            <a className="item" onClick={this.setPage.bind(this, UserList)}>
              <i className="green user icon"></i>
              Users
            </a>
            <a className="item" onClick={this.setPage.bind(this, TeamList)}>
              <i className="blue users icon"></i>
              Teams
            </a>
            <a className="item" onClick={this.setPage.bind(this, PuzzleDashboard)}>
              <i className="violet puzzle icon"></i>
              Puzzles
            </a>
            <a className="item" onClick={this.setPage.bind(this, BulkEmail)}>
              <i className="orange mail icon"></i>
              Email
            </a>
            <a className="item" onClick={this.setPage.bind(this, GamePlay)}>
              <i className="red gamepad icon"></i>
              The Game
            </a>
            <a className="item" onClick={this.setPage.bind(this, Scoring)}>
              <i className="yellow trophy icon"></i>
              Scoring
            </a>
          </div>
          {pageComp}
        </div>
      </AuthedComponentContainer>
    );
  }
}
