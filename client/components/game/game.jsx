import React, { Component, PropTypes } from 'react';
import { Container, Message, Statistic } from 'semantic-ui-react';

import GamestateComp from '../imports/gamestate-comp';
import GameCountdown from './imports/game-countdown';
import GameTeamWrapper from './imports/game-team-wrapper';

class GameStateWrapper extends Component {
  render() {
    const { ready, gamestate } = this.props;

    if (!ready) {
      return <Container><Loading/></Container>;
    }
    else if (!gamestate.gameplay) {
      return <Container><br/><GameCountdown/></Container>;
    }
    return (
      <GameTeamWrapper />
    );
  }
}

GameStateWrapper.propTypes = {
  ready: PropTypes.bool.isRequired,
  gamestate: PropTypes.object,
};

Game = GamestateComp(GameStateWrapper);
