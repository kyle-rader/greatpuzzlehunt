import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import GamestateComp from '../imports/gamestate-comp';

Game = class Game extends Component {
  render() {
    if (this.props.gamestate.gameplay) {
      this._renderMain();
    }
    else {
      return <Message
        info
        header='Game Not Running'
        content='Indication Gameplay is Currently Off'
      />
    }
  }

  _renderMain() {
    return (
      <GameAccess />
    );
  }

}

Game = GamestateComp(Game);
