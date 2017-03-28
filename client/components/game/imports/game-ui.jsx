import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Container, Message, Statistic, Button } from 'semantic-ui-react';

class GameUI extends Component {
  render() {
    const { team } = this.props;
    if (!team.hasBegun) {
      return <Button fluid size='big' color='blue' content='Click to Begin' onClick={() => this._begin() }/>
    } else if (!team.puzzles) {
      return <Loading/>
    } else {
      return this._main();
    }
  }

  _begin() {
    Meteor.call('team.begin', (error, result) => {
      if (error) alert(`Oops! ${error.reason}`);
    });
  }
}

GameUI.propTypes = {
  team: PropTypes.object.isRequired,
};

export default GameUI;
