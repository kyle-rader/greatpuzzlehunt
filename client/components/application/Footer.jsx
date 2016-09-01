import React, { Component } from 'react';

Footer = class Footer extends Component {
  render() {
    return (
      <div className="ui basic small container segment center aligned">
        <div className="ui three column grid">
          <div className="dark-blue column">
            Great Puzzle Hunt &copy; 2017
          </div>
          <div className="column">
            <a href="mailto:kyle@kylerader.ninja">Account Questions</a>
          </div>
          <div className="column">
            <a href="mailto:Millie.Johnson@wwu.edu">Event Questions</a>
          </div>
        </div>
        <br/>
      </div>
    );
  }
}
