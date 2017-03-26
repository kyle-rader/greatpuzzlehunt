import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Message, Image, Button } from 'semantic-ui-react';

import PuzzleEditor from './imports/puzzle-editor';
import PuzzleList from './imports/puzzle-list';

PuzzleDashboard = class PuzzleDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePuzzle: null,
      file: null,
      uploaded: null,
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
        {/* <Dropzone
          ref='dropzone'
          multiple={ false }
          accept='image/*'
          onDrop={(files) => this.onDrop(files)}
        />

        <Button basic content='Upload' onClick={() => this.upload() }/>

        {
          this.state.uploaded ? `Uploaded: ${this.state.uploaded.isUploaded()}` : null
        }
        <h4>Preview</h4>
        { this.state.file ? <Image src={ this.state.file.preview } /> : null }

        <h4>Uploaded Images</h4>
        <ImageList /> */}

      </Container>
    );
  }

  _editor() {
    const { activePuzzle } = this.state;
    if (activePuzzle) {
      return <PuzzleEditor
        puzzle={ activePuzzle }
        afterUpdate={ () => this.setState({ activePuzzle: null }) }
      />;
    }
    return <Message info content='Select a puzzle to edit...'/>;
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
  //
  // onDrop(files) {
  //   const file = files[0] || null;
  //   if (!file) return;
  //   this.setState({ file });
  // }
  //
  // upload() {
  //   if (!this.state.file) return;
  //
  //   Images.insert(this.state.file, (error, fileObj) => {
  //     if (error) return alert(error.reason);
  //
  //     console.log(fileObj);
  //
  //     this.setState({
  //       file: null,
  //       uploaded: fileObj,
  //     });
  //   });
  // }
}
