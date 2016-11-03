import React, { Component } from 'react';

PuzzlePageTitle = class PuzzlePageTitle extends Component {
  render() {
    return (
    <div className="ui padded grid puzzle-page-title">
      <div className="one column row">
        <div className="dark-blue column">
          <h1>{this.props.title}<br/><small>{this.props.subTitle}</small></h1>
        </div>
      </div>
    </div>
    );
  }
}
