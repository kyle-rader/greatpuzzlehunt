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
      <tr key={team._id}>
        <td>{team.name}</td>
        <td>{team.totalScore} sec</td>
      </tr>
      );
    });
  },

  render() {
    return(
      <div className="custom-bg red-square">
          <br/>
          <div className="ui raised segment transparent-bg">
              <h3 className="ui centered yellow header">Leaderboard</h3>
              <table className="ui celled table">
                <thead>
                  <tr>
                    <th>Team</th>
                    <th>Total Calculated Score (in seconds)</th>
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
