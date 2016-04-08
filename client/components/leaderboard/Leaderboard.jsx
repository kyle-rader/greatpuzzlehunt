import React from 'react';
import { Meteor } from 'meteor/meteor';
import LeaderboardListContainer from './LeaderboardListContainer.jsx';

Leaderboard = React.createClass({

  componentDidMount: function() {
    $('.ui.accordion').accordion();
  },

  render() {
    return(
      <div className="custom-bg red-square">
          <br/>
          <div className="ui raised segment transparent-bg">
              <h3 className="ui centered yellow header">Leaderboard</h3>
              <div className="ui styled fluid accordion">
                <LeaderboardListContainer />
              </div>
          </div>
      </div>
    );
  }
});
