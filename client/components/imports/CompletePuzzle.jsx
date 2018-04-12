import React, {PropTypes} from 'react';
import { Segment, Header, Message, Statistic } from 'semantic-ui-react';
import moment from 'moment';

import PuzzleProgress, { renderScore } from './puzzle-progress';

export default class CompletePuzzle extends React.Component {
  render() {
    const { team, puzzle, disabled } = this.props;

    return (
      <Segment disabled={ disabled }>
        <Header as='h3' content={ this.props.puzzle.name }/>
        <PuzzleProgress puzzle={ puzzle }/>
        <Message positive={ !puzzle.timedOut } warning={ puzzle.timedOut }>
          <Message.Header>{ this._header() }</Message.Header>
          { this._answer() }
        </Message>
      </Segment>
    );
  }

  _header() {
    if (this.props.puzzle.timedOut) {
      return 'Timed Out';
    } else {
      return 'Solved!';
    }
  }

  _answer() {
    const { puzzle } = this.props;
    const { time, minutes } = renderScore(puzzle.score);
    if (this.props.showAnswer) {
      return (
        <pre>
          Answer: { puzzle.answer }<br/>
          Hints : { puzzle.hintsTaken }<br/>
          Score : { time }<br/>
                  ({ minutes } minutes)
        </pre>
      );
    }
    return null;
  }
}

CompletePuzzle.propTypes = {
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  showAnswer: PropTypes.bool.isRequired,
};
