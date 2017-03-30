import React, { PropTypes } from 'react';
import { Segment, Header, Progress, Button } from 'semantic-ui-react';

import UnstartedPuzzle from './unstarted-puzzle';
import CompletePuzzle from '../../imports/complete-puzzle';

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
    const { team, puzzle, disabled } = this.props;
    const { complete } = this.state;
    if (complete) {
      return <CompletePuzzle
        team={ team }
        puzzle={ puzzle }
        disabled={ disabled }
        showAnswer={ true }
      />;
    } else {
      return <UnstartedPuzzle
        team={ team }
        puzzle={ puzzle }
        disabled={ disabled }
      />;
    }
  }
}

InactivePuzzle.propTypes = {
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};
