import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import { GamestateControls } from './imports/GamestateControls';

AdminGamestate = class AdminGamestate extends Component {
  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Game Control'/>
        <GamestateControls />
      </Container>
    );
  }
}
