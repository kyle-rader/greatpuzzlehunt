import { Meteor } from 'meteor/meteor';

import React, {PropTypes} from 'react';

export default class VolunteerTimerUI extends React.Component {
  render() {
    return (<pre>
      { JSON.stringify(this.props.team, null, 2) }
    </pre>);
  }
}

VolunteerTimerUI.propTypes = {
  team: PropTypes.object.isRequired,
};
