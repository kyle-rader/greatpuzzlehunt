import { Meteor } from 'meteor/meteor';
import React, {PropTypes} from 'react';

class GameProgressInner extends React.Component {
  render() {
    return (<div>MyComponent</div>);
  }
}

GameProgressInner.propTypes = {
  ready: PropTypes.bool.isRequired,
  teams: PropTypes.array,
};
