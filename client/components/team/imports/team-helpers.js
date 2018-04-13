import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

export const DIVISION_OPTS = [
  { text: 'All', value: 'all' },
  { text: 'WWU Student', value: 'wwu-student' },
  { text: 'WWU Alumni', value: 'wwu-alumni' },
  // { text: 'Post-Secondary/Non-WWU college', value: 'post-secondary' },
  { text: 'High School', value: 'highschool' },
  { text: 'Open', value: 'open' },
];

export const DIVISION_MAP = {
  'wwu-student': 'WWU Student',
  'wwu-alumni': 'WWU Alumni',
  // 'post-secondary': 'Post-Secondary/Non-WWU college',
  'highschool': 'High School',
  'open': 'Open',
};
