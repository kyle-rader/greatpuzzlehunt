import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class LeaderboardListItem extends React.Component{

  getHead(){
    return(
      <div className="title">
        <div className="ui horizontal segments">
          <div className="ui red segment">
            <p>{this.props.name}</p>
          </div>
          <div className="ui blue segment">
            <p>Completed:{this.props.attempts.length - 1}</p>
          </div>
          <div className="ui yellow segment">
            <p>Score:{this.getScores()}</p>
          </div>
        </div>
      </div>
    );
  }

  getTableRows(){
    return this.props.attempts.map((attempt)=>{
      return (
        <tr>
          <td>attempt._id</td>
          <td>attempt.hintsUsed</td>
          <td>{this.getScore(attempt)}</td>
        </tr>
      );
    });
  }

  getContents(){
    <div className="content">
      <table className="ui table">
        <thead>
          <tr>
            <th>Puzzle</th>
            <th>Hints</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {this.getTableRows()}
        </tbody>
      </table>
    </div>
  }

  getCompleted(){
    return _.filter(this.props.attempts, (elm)=>{
      return elm.finishTime != null;
    }).length;
  }

  getScore(elm){
    time = 120;
    if(elm.finishTime && (elm.finishTime - elm.startTime).getHours() == 0){
      time = (elm.finishTime - elm.startTime).getMinutes();
    }
    return time + (elm.hintsUsed * 10);
  }

  getScores(){
      return _.reduce(this.props.attempts, (memo, elm)=>{
        return memo + this.getScore(elm);
      });
  }

  render(){
      <div data-score="{getScores()}" class="leader">
        {this.getHead()}
        {this.getCompleted()}
      </div>
  }
};

export default class LeaderboardList extends React.Component{

  getTeams(){
    return this.props.teams.map((team)=>{
      return (
        <LeaderboardListItem team={team} attempts={this.props.attempts[team._id]} />
      );
    });
  }

  search(event) {
  }

  componentDidMount() {
    var t = $(".leader");
    t.sort((a, b)=>{
      return $(a).data("score") - $(b).data("score");
    });
    $("#teams").html(t)
  }

  render() {
      return (
        <div id="teams">
          {this.getTeams()}
        </div>
      );
  }
};

LeaderboardList.propTypes = {
    leaders: React.PropTypes.object,
    loading: React.PropTypes.bool,
};
