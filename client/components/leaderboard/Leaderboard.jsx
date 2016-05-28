import React from 'react';
import { Meteor } from 'meteor/meteor';

export default Leaderboard = React.createClass({

  mixins:[ReactMeteorData],
  getMeteorData() {
    let data = {};

    let teamsHandle = Meteor.subscribe('teams');
    let teamsLoading = !teamsHandle.ready();

    if (!teamsLoading) {
      data.teams = Teams.find({finished: true}, {sort: {totalScore: 1}}).fetch();
    }
    
    return data;
  },

  getRows() {
    if (!this.data.teams) {
      return (
      <tr><td colSpan="2"><LoadingSegment /></td></tr>
      );
    }

    return this.data.teams.map((team) => {
      return (
        <TeamLeaderRow key={team._id} team={team} />
      );
    });
  },

  render() {
    return(
      <div className="custom-bg red-square">
          <br/>
          <div className="ui raised segment transparent-bg">
              <h3 className="ui centered yellow header">2016 Leaderboard</h3>
              <table className="ui celled table">
                <thead>
                  <tr>
                    <th width="15%">Team</th>
                    <th width="15%">Total Scored Time <a target="_blank" href="/pdfs/The Great Puzzle Hunt Rules of Play and Tips.pdf"><i className="ui fitted circular help icon"></i></a> (hh:mm:ss)</th>
                    <th>Time will Tell</th>
                    <th>Fold and Behold</th>
                    <th>Stop the Clock</th>
                    <th>Cite Unseen</th>
                    <th>Meta Puzzle</th>
                  </tr>
                </thead>
                <tbody>
                  {this.getRows()}
                </tbody>
              </table>
          </div>
          <br/>
      </div>
    );
  }
});
