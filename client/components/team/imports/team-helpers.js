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

export const DIVISION_OPTS = [
  { text: 'All', value: 'all' },
  { text: 'WWU Student', value: 'wwu-student' },
  { text: 'WWU Alumni', value: 'wwu-alumni' },
  { text: 'Post-Secondary/Non-WWU college', value: 'post-secondary' },
  { text: 'High School', value: 'high-school' },
  { text: 'Open', value: 'open' },
];

export const DEVISION_MAP = {
  'wwu-student': 'WWU Student',
  'wwu-alumni': 'WWU Alumni',
  'post-secondary': 'Postbac/Non-WWU College',
  'high-school': 'High School',
  'open': 'Open',
};
