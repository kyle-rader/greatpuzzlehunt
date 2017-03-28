import React, { Component, PropTypes } from 'react';
import { Container, Message, Statistic } from 'semantic-ui-react';
import moment from 'moment';

import GamestateComp from '../imports/gamestate-comp';
import GameCountdown from './imports/game-countdown';

class GameInner extends Component {

  constructor(props) {
    super(props);
    this.state = {
      now: moment(),
      interval: Meteor.setInterval(() => this.setState({ now: moment() }), 1000),
    };
  }

  componentWillUnmount() {
    Meteor.clearInterval(this.state.interval);
  }

  render() {
    return (
      <Container>
        <br/>
        { this._renderMain() }
      </Container>
    );
  }

  _renderMain() {
    const { ready, gamestate } = this.props;
    const timeToStart = moment('2017-04-01T10:00:00-07:00').from(this.state.now, true);
    if (!ready) {
      return <Loading/>
    }
    else if (!gamestate.gameplay) {
      return <GameCountdown timeToStart={ timeToStart }/>;
    }
    return (
      <div>Game ON!</div>
    );
  }
}

GameInner.propTypes = {
  ready: PropTypes.bool.isRequired,
  gamestate: PropTypes.object,
};

Game = GamestateComp(GameInner);
