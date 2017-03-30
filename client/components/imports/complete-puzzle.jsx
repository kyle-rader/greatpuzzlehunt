import React, {PropTypes} from 'react';
import { Segment, Header, Message } from 'semantic-ui-react';

import PuzzleProgress from './puzzle-progress';

export default class CompletePuzzle extends React.Component {
  render() {
    const { team, puzzle, disabled } = this.props;

    return (
      <Segment disabled={ disabled }>
        <Header as='h3' content={ this.props.puzzle.name }/>
        <PuzzleProgress puzzle={ puzzle }/>
        <Message positive>
          <Message.Header>Solved</Message.Header>
          { this._answer() }
        </Message>
      </Segment>
    );
  }

  _answer() {
    if (this.props.showAnswer) {
      return <pre>{ this.props.puzzle.answer }</pre>;
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
