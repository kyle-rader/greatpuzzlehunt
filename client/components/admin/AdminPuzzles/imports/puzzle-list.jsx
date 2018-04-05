import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Label, Button } from 'semantic-ui-react';

import puzzleTracker from './PuzzleTracker';

const stagesColors = ['green', 'blue', 'orange', 'red'];

class PuzzleList extends Component {
  render() {
    return (
      <Grid stackable>
        { this._actions() }
        { this._puzzles() }
      </Grid>
    );
  }

  _actions() {
    return (
      <Grid.Row columns='1'>
        <Grid.Column>
          <Header as='h3' content='Puzzles'/>
          <Button basic size='small' content='New Puzzle' onClick={ () => this._createPuzzle() }/>
        </Grid.Column>
      </Grid.Row>
    );
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
      <Grid.Row columns={5} key={ puzzle._id }>
        <Grid.Column>
          <Label color={ stagesColors[puzzle.stage] } content={ puzzle.stage }/>&nbsp; { puzzle.name }
        </Grid.Column>
        <Grid.Column>
          {puzzle.allowedTime} allowed
        </Grid.Column>
        <Grid.Column>
          {puzzle.bonusTime} bonus
        </Grid.Column>
        <Grid.Column>
          {puzzle.timeoutScore} timeout score
        </Grid.Column>
        <Grid.Column>
          <Button basic floated='right'
            icon='trash'
            onClick={ () => this._delete(puzzle) }
          />
          <Button basic floated='right'
            content='Edit'
            color='green'
            onClick={ () => this._edit(puzzle) }
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

export default puzzleTracker(PuzzleList);
