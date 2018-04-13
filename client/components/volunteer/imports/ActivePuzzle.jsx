import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { Segment, Header, Progress, Button } from 'semantic-ui-react';

import PuzzleProgress from '../../imports/PuzzleProgress';

export default class ActivePuzzle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { team, puzzle } = this.props;

    return (
      <Segment>
        <Header as='h3' content={ puzzle.name }/>
        <PuzzleProgress puzzle={ puzzle }/>
        <br/>
        <Button
          basic fluid
          color='red'
          content='Reset Timer'
          onClick={ () => this._resetTimer() }
        />
      </Segment>
    );
  }

  _resetTimer() {
    const { team, puzzle } = this.props;
    const confirmMsg = `
You want to reset ${puzzle.name}
for team: ${team.name}?

Are you absolutely positive?
`
    if (!confirm(confirmMsg)) return;

    Meteor.call('volunteer.team.resetPuzzle', team._id, puzzle.puzzleId, (error, result) => {
      if (error) return this.setState({ error });
    });
  }
}

ActivePuzzle.propTypes = {
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
};
