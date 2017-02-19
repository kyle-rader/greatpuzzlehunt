import React, { Component } from 'react';
import ProfileCards from './imports/profile-cards';

Contact = class Contact extends Component {

  render() {
    return (
    <div className="ui container">
      <PuzzlePageTitle title="Contact"/>
      <h3>
        For Event Questions Contact Millie at <a href='mailto:millie@greatpuzzlehunt.com'>millie.johnson@wwu.edu</a>
        <br/><br/>
        For Account/Tech Questions Contact Kyle at <a href='mailto:kyle@kylerader.ninja'>kyle@kylerader.ninja</a>
      </h3>
      <ProfileCards />
    </div>
    );
  }

}
