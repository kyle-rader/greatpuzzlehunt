import React, { Component, PropTypes } from 'react';
import { Message, Statistic } from 'semantic-ui-react';

class GameCountdown extends Component {
  render() {
    const { timeToStart } = this.props;
    return (
      <Message info>
        <Message.Header>The Hunt has not started yet!</Message.Header>
        <Message.Content>
          <br/>
          <Statistic>
            <Statistic.Label>Starting In</Statistic.Label>
            <Statistic.Value>{ timeToStart }</Statistic.Value>
          </Statistic>
        </Message.Content>
      </Message>
    );
  }
}

GameCountdown.propTypes = {
  timeToStart: PropTypes.string.isRequired,
};

export default GameCountdown;
