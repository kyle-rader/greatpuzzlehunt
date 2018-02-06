import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export default (Comp) => createContainer(() => {
  const handle = Meteor.subscribe('admin.images');
  const ready = handle.ready();
  const images = ready ? Images.find().fetch() : [];
  return {
    ready,
    images,
  };
}, Comp);
