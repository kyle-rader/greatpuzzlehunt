import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

export default function TeamComp(Comp) {
  return withTracker(() => {
    const handle = Meteor.subscribe('teams.myTeam');
    const user = Meteor.user();
    const ready = Boolean(handle.ready() && user);
    const team = ready ? Teams.findOne(user.teamId) : null;

    const teamMembers = ready ? Meteor.users.find({ teamId: user.teamId }).fetch() : [];

    return {
      user,
      ready,
      team,
      teamMembers,
    };
  })(Comp);
};
