import React, { Component } from 'react';
import SamplePuzzles from './imports/sample-puzzles';

Puzzles = class Puzzle extends Component {

  render() {
    return (
      <div className="ui container">
        <br/>
        <SamplePuzzles/>
      </div>
    );
  }
}
