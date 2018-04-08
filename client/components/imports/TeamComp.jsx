import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

export default function TeamComp(Comp) {
  return withTracker((props) => {
    const handle = Meteor.subscribe('teams.myTeam');
    const user = Meteor.user();
    const team = user ? Teams.findOne(user.teamId) : null;
    const teamMembers = user ? Meteor.users.find({ teamId: user.teamId }) : [];
    const ready = Boolean(handle.ready() && user);

    return {
      user,
      ready,
      team,
      teamMembers,
    };
  })(Comp);
};
