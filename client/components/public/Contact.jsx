import React, { Component } from 'react';

Contact = class Contact extends Component {

  render() {
    return (
    <div className="ui container">
      <PuzzlePageTitle title="Contact"/>

      <div className="ui padded stackable grid">
        <ProfileCards />
      </div>
    </div>
    );
  }

}
