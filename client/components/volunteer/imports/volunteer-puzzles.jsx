import { Meteor } from 'meteor/meteor';
import React, {PropTypes} from 'react';
import { Grid, Header } from 'semantic-ui-react';

import VolunteerPuzzle from './volunteer-puzzle';

export default class VolunteerPuzzles extends React.Component {
  render() {
    const { team } = this.props;
    return (
      <Grid stackable>
        <Grid.Row columns='1'>
          <Grid.Column>
            <Header as='h2' content={ `Team: ${team.name}` }/>
            { this._renderPuzzles() }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  _renderPuzzles() {
    const { team, targetPuzzle } = this.props;
    if (!team.puzzles) return <Loading/>;
    return team.puzzles.map((puzzle) => <VolunteerPuzzle
      team={ team }
      puzzle={ puzzle }
      targetPuzzle={ targetPuzzle }
      key={ puzzle.puzzleId }
    />);
  }

}

VolunteerPuzzles.propTypes = {
  team: PropTypes.object.isRequired,
  targetPuzzle: PropTypes.string.isRequired,
};
