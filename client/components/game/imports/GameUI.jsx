import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Container, Button } from 'semantic-ui-react';

import GameStats from './GameStats';
import GamePuzzles from './GamePuzzles';

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

  _main() {
    const { team } = this.props;
    return (
      <div>
        <GameStats team={ team }/>
        <GamePuzzles team={ team }/>
      </div>
    );
  }
}

GameUI.propTypes = {
  team: PropTypes.object.isRequired,
};

export default GameUI;
