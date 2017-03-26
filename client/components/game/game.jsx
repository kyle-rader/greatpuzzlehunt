import React, { Component, PropTypes } from 'react';
import { Container, Message } from 'semantic-ui-react';
import GamestateComp from '../imports/gamestate-comp';
import moment from 'moment';

class GameInner extends Component {
  render() {
    return (
      <Container>
        <PuzzlePageTitle title='The Game'/>
        { this._renderMain() }
      </Container>
    );
  }

  _renderMain() {
    const { ready, gamestate } = this.props;
    const timeToStart = moment('2017-04-01T10:00:00-07:00').fromNow();
    if (!ready) {
      return <Loading/>
    }
    else if (!gamestate.gameplay) {
      return <Message
        info
        header='The Hunt has not started yet!'
        content={`The Hunt will begin ${timeToStart}`}
      />
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
