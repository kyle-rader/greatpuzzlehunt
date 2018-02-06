import { createContainer } from 'meteor/react-meteor-data';

export default (Comp) => createContainer(() => {
  const handle = Meteor.subscribe('admin.puzzles');
  const ready = handle.ready();
  const puzzles = Puzzles.find({}).fetch();

  return {
    ready,
    puzzles,
  };
}, Comp);
