import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Message, Image, Button } from 'semantic-ui-react';

import Dropzone from 'react-dropzone';
import ImageList from './imports/image-list';

PuzzleDashboard = class PuzzleDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      uploaded: null,
    };
  }

  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Puzzles'/>
        <Dropzone
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
        <ImageList />

      </Container>
    );
  }

  onDrop(files) {
    const file = files[0] || null;
    if (!file) return;
    this.setState({ file });
  }

  upload() {
    if (!this.state.file) return;

    Images.insert(this.state.file, (error, fileObj) => {
      if (error) return alert(error.reason);

      console.log(fileObj);

      this.setState({
        file: null,
        uploaded: fileObj,
      });
    });
  }
}
