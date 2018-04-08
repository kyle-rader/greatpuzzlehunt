import { meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Segment, Header, Icon, Button
} from 'semantic-ui-react';

class PostUserCheckin extends Component {
  render() {
    return (
      <div>REady to checkin members</div>
    );
  }
}

PostUserCheckin.propTypes = {
  user: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  teamMembers: PropTypes.arrayOf(Object).isRequired,
};

export default PostUserCheckin;
