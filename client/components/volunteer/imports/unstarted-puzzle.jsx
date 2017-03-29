import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { Segment, Header, Button, Message } from 'semantic-ui-react';
import { find } from 'lodash';

export default class UnstartedPuzzle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  render() {
    const { team, puzzle, disabled } = this.props;

    return (
      <Segment disabled={ disabled }>
        <Header as='h3' content={ puzzle.name }/>
        { this._startButton() }
        { this._error() }
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

  _error() {
    if (!this.state.error) return null;
    return (
      <Message negative
        header='Error'
        content={ this.state.error.reason }
        onDismiss={ () => this.setState({ error: null }) }
      />
    );
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

    Meteor.call('volunteer.team.startPuzzle', team._id, puzzle.puzzleId, (error, result) => {
      if (error) return this.setState({ error });
    });
  }

}

UnstartedPuzzle.propTypes = {
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  targetPuzzle: PropTypes.string,
};
