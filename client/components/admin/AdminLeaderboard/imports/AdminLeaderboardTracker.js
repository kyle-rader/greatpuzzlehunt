import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { groupBy, every } from 'lodash';

export default function AdminLeaderboardTracker(Comp) {
  return withTracker((props) => {
    const handle = Meteor.subscribe('admin.leaderboard');
    const ready = handle.ready();

    const users = ready ? Meteor.users.find({ checkedIn: true, teamId: { $ne: null } }).fetch() : [];
    const usersByTeam = groupBy(users, 'teamId');
    const teams = ready ? Teams.find({ hasBegun: true }).fetch() : [];

    teams.forEach((team) => {
      team.finished = every(team.puzzles, (puzzle) => Boolean(puzzle.end));
      team.memberIds = team.members;
      team.members = usersByTeam[team._id];
    });

    return {
      ready,
      teams,
    };

  })(Comp);
};
