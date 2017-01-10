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
            <a href="mailto:support@greatpuzzlehunt.com">Account Questions</a>
          </div>
          <div className="column">
            <a href="mailto:millie@greatpuzzlehunt.com">Event Questions</a>
          </div>
        </div>
        <br/>
      </div>
    );
  }
}
