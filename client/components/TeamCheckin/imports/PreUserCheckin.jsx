import { meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Segment, Icon, Button
} from 'semantic-ui-react';

class PreUserCheckin extends Component {
  render() {
    return (
      <Segment basic>
        <Button fluid color="green" size="large" icon="rocket" content="Start Check In" onClick={(e) => this._startChecking(e)}/>
      </Segment>
    );
  }

  _startChecking(e) {
    e.preventDefault();
  }
}

PreUserCheckin.propTypes = {
  user: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
};

export default PreUserCheckin;
