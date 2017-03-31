import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { Segment, Header, Progress, Button } from 'semantic-ui-react';

import PuzzleQRCode from './puzzle-qr-code';
import PuzzleAnswerForm from './puzzle-answer-form';
import PuzzleProgress from '../../imports/puzzle-progress';
import PuzzleHints from './puzzle-hints';

export default class ActivePuzzle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { team, puzzle } = this.props;

    return (
      <Segment>
        <Header as='h3' content={ puzzle.name }/>
        <PuzzleQRCode
          team={ team }
          puzzle={ puzzle }
          disabled={ false }
          qrLabel='Show to a Volunteer in case of puzzle emergency'
          qrButtonLabel='Puzzle QR Code'
          color='grey'
        />
        <PuzzleProgress puzzle={ puzzle }/>
        <PuzzleAnswerForm
          team={ team }
          puzzle={ puzzle }
        />
        <PuzzleHints
          team={ team }
          puzzle={ puzzle }
        />
      </Segment>
    );
  }
}

ActivePuzzle.propTypes = {
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
};
