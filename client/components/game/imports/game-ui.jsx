import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Container, Message, Statistic, Button } from 'semantic-ui-react';

class GameUI extends Component {
  render() {
    const { team } = this.props;
    if (!team.hasBegun) {
      return <Button fluid size='big' color='blue' content='Click to Begin'/>
    } else {
      return this._main();
    }
  }
}

GameUI.propTypes = {
  team: PropTypes.object.isRequired,
};

export default GameUI;
