import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component, PropTypes } from 'react';
import { Grid, Label, Button } from 'semantic-ui-react';

import puzzleSubscriber from './puzzle-subscriber';

const stagesColors = ['green', 'blue', 'orange', 'red'];

class PuzzleList extends Component {
  render() {
    return (
      <Grid>
        { this._actions() }
        { this._puzzles() }
      </Grid>
    );
  }

  _actions() {
    return (
      <Grid.Row columns='1'>
        <Grid.Column>
          <Button basic size='small' floated='right' content='New Puzzle' onClick={ () => this._createPuzzle() }/>
        </Grid.Column>
      </Grid.Row>
    )
  }

  _createPuzzle() {
    Meteor.call('admin.puzzle.create', (error, result) => {
      if (error) return alert(error.reason);
      console.log('Created Puzzle', result);
    });
  }

  _puzzles() {
    const { puzzles } = this.props;
    return puzzles.map((puzzle) => this._puzzle(puzzle));
  }

  _puzzle(puzzle) {
    return (
      <Grid.Row columns='1' key={ puzzle._id }>
        <Grid.Column>
          <Label color={ stagesColors[puzzle.stage] } content={ puzzle.stage }/>&nbsp; { puzzle.name }
          <Button basic floated='right'
            content='Edit'
            onClick={ () => this._edit(puzzle) }
          />
          <Button basic floated='right'
            icon='trash'
            color='red'
            onClick={ () => this._delete(puzzle) }
          />
        </Grid.Column>
      </Grid.Row>
    );
  }

  _edit(puzzle) {
    this.props.onEdit(puzzle);
  }

  _delete(puzzle) {
    this.props.onDelete(puzzle);
  }
}

PuzzleList.propTypes = {
  puzzles: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default puzzleSubscriber(PuzzleList);
