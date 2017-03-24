import React, {PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';

export default (Comp) => createContainer(() => {
  const handle = Meteor.subscribe('gamestate');
  const ready = handle.ready();
  const gamestate = Gamestate.findOne({});

  return {
    ready,
    gamestate,
  };
}, Comp);
