import React, { PropTypes } from 'react';
import { Segment, Header, Progress, Button } from 'semantic-ui-react';

import UnstartedPuzzle from './UnstartedPuzzle';
import CompletePuzzle from '../../imports/CompletePuzzle';

export default class InactivePuzzle extends React.Component {
  constructor(props) {
    super(props);
    const { team, puzzle } = props;
    this.state = {
      complete: Boolean(puzzle.score),
      showQRcode: false,
    };
  }

  render() {
    const { team, volunteer, puzzle, disabled } = this.props;
    const { complete } = this.state;
    if (complete) {
      return <CompletePuzzle team={team} puzzle={puzzle} disabled={disabled} showAnswer={false}/>;
    } else {
      return <UnstartedPuzzle
        team={team}
        volunteer={volunteer}
        puzzle={puzzle}
        disabled={disabled}
        showAnswer={false}
      />;
    }
  }
}

InactivePuzzle.propTypes = {
  team: PropTypes.object.isRequired,
  volunteer: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};
