import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Message } from 'semantic-ui-react';

import Dropzone from 'react-dropzone';

PuzzleDashboard = class PuzzleDashboard extends Component {
  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Puzzles'/>
        <Dropzone
          ref='dropzone'
          multiple={ false }
          onDrop={(files) => this.onDrop(files)} />
      </Container>
    );
  }

  onDrop(files) {
    console.log(files);
  }
}
