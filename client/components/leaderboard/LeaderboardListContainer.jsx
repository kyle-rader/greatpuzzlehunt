import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import LeaderboardList from './LeaderboardList.jsx';

export default createContainer(() => {

  const leaderboardHandle = Meteor.subscribe('leaderboards');
  const teamnameHandle = Meteor.subscribe('team.names')

  const loading = !leaderboardHandle.ready() || teamnameHandle.ready();

  const leaders = PuzzleAttempts.find({}, {sort: {"teamId": 1}});
  const teams = Teams.find({});

  var res = {};

  if(!loading)
  {
    res = _.groupBy(leaders.fetch(), (elm)=>{
      return elm.teamId;
    });
  }

  return {
    loading,
    leaders: res,
    teams: !loading ? teams.fetch() : [],
  };

}, LeaderboardList);
