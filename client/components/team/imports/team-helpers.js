import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export function makeTeamComp(Comp) {
  return createContainer((props) => {
    const handle = Meteor.subscribe('teams.myTeam');
    const user = Meteor.user();
    const team = user ? Teams.findOne(user.teamId) : null;
    const ready = handle.ready() && user;

    return {
      user,
      ready,
      team,
    };
  }, Comp);
}
