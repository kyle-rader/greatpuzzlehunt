import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import { GamestateControls } from './imports/GamestateControls';

GamestateManager = class GamestateManager extends Component {
  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Game Control'/>
        <GamestateControls />
      </Container>
    );
  }
}
