import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Message, Statistic } from 'semantic-ui-react';

import GamestateComp from '../imports/GamestateComp';
import GameCountdown from './imports/GameCountdown';
import GameTeamWrapper from './imports/GameTeamWrapper';

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
