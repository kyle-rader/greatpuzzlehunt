import { meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Segment, Icon, Button
} from 'semantic-ui-react';

class PreUserCheckin extends Component {
  render() {
    return (
      <Button fluid color="green" size="large" icon="rocket" content="Start Check In" onClick={(e) => this._startChecking(e)}/>
    );
  }

  _startChecking(e) {
    e.preventDefault();
    Meteor.call('team.checkin.start', (error, result) => {
      if (error) return alert(`Oops! ${error.reason}`);
    });
  }
}

PreUserCheckin.propTypes = {
  user: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
};

export default PreUserCheckin;
