import React, { Component } from 'react';

export default class HomeHeader extends Component {
  render() {
    return (
      <div className="header-main">
        <div className="header-text -left">
          <div className="extra-text red-text">The Second Annual</div>
          WWU Great
          <img className="footprints" src="/img/footprints-left.png"/>
        </div>
        <img src="/img/logo-color-512.png"/>
        <div className="header-text -right">
          <img className="footprints" src="/img/footprints-right.png"/>
          Puzzle Hunt
          <div className="extra-text">
            <strong>
              <span className="dark-blue">Mobilizing</span>
              <span className="blue-text">Minds</span>
            </strong>
          </div>
        </div>
      </div>
    );
  }
}
