import React, { Component } from 'react';
import SamplePuzzlesInner from './imports/SamplePuzzles';
import { Container } from 'semantic-ui-react';

SamplePuzzles = class Puzzle extends Component {

  render() {
    return (
      <Container>
        <br/>
        <SamplePuzzlesInner/>
      </Container>
    );
  }
}
