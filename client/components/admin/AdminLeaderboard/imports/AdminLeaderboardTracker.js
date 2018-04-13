import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

export default function AdminLeaderboardTracker(Comp) {
  return withTracker((props) => {
    const handle = Meteor.subscribe('admin.leaderboard');
    const ready = handle.ready();

    const user = Meteor.user();
    const users = ready ? Meteor.users.find({ checkedIn: true, teamId: { $ne: null } }).fetch() : [];
    const teams = ready ? Teams.find({ hasBegun: true }).fetch() : [];

    return {
      ready: ready && Boolean(user),
      user,
      users,
      teams,
    };

  })(Comp);
};
