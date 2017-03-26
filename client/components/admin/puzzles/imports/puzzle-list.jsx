import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component, PropTypes } from 'react';
import { Grid, Label, Button } from 'semantic-ui-react';

import puzzleSubscriber from './puzzle-subscriber';

const stageColorMap = {
  1: 'green',
  2: 'blue',
  3: 'orange',
  4: 'red',
};

class PuzzleList extends Component {
  render() {
    return (
      <Grid>
        { this._puzzles() }
      </Grid>
    );
  }

  _puzzles() {
    const { puzzles } = this.props;
    return puzzles.map((puzzle) => this._puzzle(puzzle));
  }

  _puzzle(puzzle) {
    return (
      <Grid.Row columns='1' key={ puzzle._id }>
        <Grid.Column>
          { puzzle.name } &nbsp; <Label color={ stageColorMap[puzzle.stage] } content={ puzzle.stage }/>
          <Button basic float='right'
            content='Edit'
            onClick={ () => this._edit(puzzle._id) }
          />
          <Button basic float='right'
            icon='trash'
            color='red'
            onClick={ () => this._delete(puzzle._id) }
          />
        </Grid.Column>
      </Grid.Row>
    );
  }

  _edit(puzzleId) {
    this.props.onEdit(puzzleId);
  }

  _delete(puzzleId) {
    this.props.onDelete(puzzleId);
  }
}

PuzzleList.propTypes = {
  puzzles: PropTypes.array.isRequired,
};

export default puzzleSubscriber(PuzzleList);
