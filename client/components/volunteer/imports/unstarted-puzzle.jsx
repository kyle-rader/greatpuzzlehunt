import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { Segment, Header, Button, Message } from 'semantic-ui-react';
import { find } from 'lodash';

export default class UnstartedPuzzle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { team, puzzle, disabled } = this.props;

    return (
      <Segment disabled={ disabled }>
        <Header as='h3' content={ puzzle.name }/>
        { this._startButton() }
      </Segment>
    );
  }

  _startButton() {
    const { disabled } = this.props;
    if (disabled) {
      return <Message content='Another Puzzle is being solved'/>;
    } else {
      return <Button
        color='green'
        fluid basic
        size='large'
        content='Start Timer'
        onClick={ () => this._startTimer() }
      />;
    }
  }

  _startTimer() {
    const { team, puzzle, targetPuzzle } = this.props;
    if (puzzle.puzzleId !== targetPuzzle) {
      const target = find(team.puzzles, (p) => p.puzzleId === targetPuzzle);
      const warningMsg = `
WARNING!
They asked for
"${target.name}"

But, you are trying to start
"${puzzle.name}"

Are you sure you want to start this timer?
`
      if (!confirm(warningMsg)) return;
    }

    alert(`Lets start ${puzzle.name}`);
  }

}

UnstartedPuzzle.propTypes = {
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  targetPuzzle: PropTypes.string,
};
