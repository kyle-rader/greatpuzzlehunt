import React, {PropTypes} from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';

import PuzzleQRCode from './puzzle-qr-code';

export default class UnstartedPuzzle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showQRcode: false,
    };
  }

  render() {
    const { team, puzzle, disabled } = this.props;
    const startUrl = `${window.location.origin}/volunteer/time/${team._id}/${puzzle.puzzleId}`;
    return (
      <Segment disabled={ disabled }>
        <Header as='h3' content={ this.props.puzzle.name }/>
        <PuzzleQRCode
          team={ team }
          puzzle={ puzzle }
          disabled={ disabled }
          qrLabel='Show QR Code to a Volunteer to Start!'
          qrButtonLabel='Start Puzzle!'
        />
      </Segment>
    );
  }
}

UnstartedPuzzle.propTypes = {
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};
