import React, {PropTypes} from 'react';
import { Message } from 'semantic-ui-react';

import GamestateComp from '../../imports/gamestate-comp';

class RegistrationStatus extends React.Component {
  render() {
    if (this.props.ready && !this.props.gamestate.registration) {
      return <Message
        info
        header='Registration is closed'
        content='The 2018 Great Puzzle Hunt is now in development!'
      />
    } else {
      return null;
    }
  }
}

export default GamestateComp(RegistrationStatus);
