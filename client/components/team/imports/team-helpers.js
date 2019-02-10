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

export const DIVISION_TYPES = [
  {
    text: 'WWU Student',
    value: 'wwu-student',
    wristBandColor: "Orange",
    description: "All team members must be currently enrolled at WWU (undergrad or grad)."
  },
  {
    text: 'WWU Alumni',
    value: 'wwu-alumni',
    wristBandColor: "Blue",
    description: "At least half of team members must be WWU Alumni."
  },
  {
    text: 'High School',
    value: 'highschool',
    wristBandColor: "Green",
    description: "All team members must be currently enrolled in high school. Exception: One adult chaperone per team may register as a team member."
  },
  {
    text: "Non-Competitive",
    value: "noncompetitive",
    wristBandColor: "(unknown)",
    description: "[[NON-COMPETITIVE DIVISION DESCRIPTION]]"
  },
  {
    text: 'Open',
    value: 'open',
    wristBandColor: "Yellow",
    description: "Open - General public, mixed student/non-student, family (children under age 14 must be accompanied by a parent/guardian)."
  },
];

export const WRIST_BAND_COLOR = function(){
  let map = {};
  DIVISION_TYPES.forEach(div => {
    map[div.value] = div.wristBandColor
  });
  return map;
}();

// export const DIVISION_OPTS = [
//   ...DIVISION_TYPES.map(div => ({text: div.text, value: div.value})),
//   {text: "All", value: "all"}
// ];

// export const DIVISION_MAP = function(){
//   map = {};
//   DIVISION_TYPES.forEach(div => {
//     map[div.value] = div.text
//   });
//   return map;
// }();

export const DIVISION_MAP = {
  'wwu-student': 'WWU Student',
  'wwu-alumni': 'WWU Alumni',
  // 'post-secondary': 'Post-Secondary/Non-WWU college',
  'highschool': 'High School',
  'open': 'Open',
};
