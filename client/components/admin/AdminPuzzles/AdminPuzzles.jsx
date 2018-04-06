import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Header, Message, Image, Button } from 'semantic-ui-react';

import PuzzleEditor from './imports/PuzzleEditor';
import PuzzleList from './imports/PuzzleList';

AdminPuzzles = class AdminPuzzles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePuzzle: null,
    };
  }

  render() {
    const { activePuzzle } = this.state;
    return (
      <Container>
        <PuzzlePageTitle title='Puzzles'/>
        { this._editor() }
        <br/>
        <PuzzleList
          onEdit={ (puzzle) => this._editPuzzle(puzzle) }
          onDelete={ (puzzle) => this._deletePuzzle(puzzle) }
        />
      </Container>
    );
  }

  _editor() {
    const { activePuzzle } = this.state;
    if (!activePuzzle) {
      return <Message info content='Select a puzzle to edit...'/>;
    }
    return (
      <PuzzleEditor
        puzzle={ activePuzzle }
        closePuzzle={ () => this.setState({ activePuzzle: null }) }
      />
    );
  }

  _editPuzzle(puzzle) {
    this.setState({ activePuzzle: puzzle });
  }

  _deletePuzzle(puzzle) {
    if (!confirm(`Are you sure you want to delete ${puzzle.name} (${puzzle._id})?`)) return;
    Meteor.call('admin.puzzle.delete', puzzle._id, (error, result) => {
      if (error) return alert(error.reason);
      console.log(`Deleted puzzle ${puzzle.name} (${puzzle._id})`);
    });
  }
}
