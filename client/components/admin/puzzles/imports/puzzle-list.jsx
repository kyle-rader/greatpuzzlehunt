import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component, PropTypes } from 'react';
import { Grid, Label, Button } from 'semantic-ui-react';

const stageColorMap = {
  1: 'green',
  2: 'blue',
  3: 'orange',
  4: 'red',
};

class PuzzleListInner extends Component {
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

PuzzleListInner.propTypes = {
  puzzles: PropTypes.array.isRequired,
};

export default PuzzleList = createContainer(() => {
  const handle = Meteor.subscribe('admin.puzzles');
  const ready = handle.ready();
  const puzzles = ready ? Puzzles.find().fetch() : [];
  return {
    ready,
    puzzles,
  };
}, PuzzleListInner);
