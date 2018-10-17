import React, { Component } from 'react';

import ProfileCards from './imports/ProfileCards';
import ICEContact from '../imports/ice-contact';

Contact = class Contact extends Component {

  render() {
    return (
    <div className="ui container">
      <PuzzlePageTitle title="Contact"/>
      <ICEContact/>
      <br/>
      <ProfileCards />
      <h3>
        For Event Questions Contact Millie at <a href='mailto:millie@greatpuzzlehunt.com'>millie.johnson@wwu.edu</a>
        <br/><br/>
        For Account/Tech Questions Contact <a href='mailto:support@greatpuzzlehunt.com'>support@greatpuzzlehunt.com</a>
      </h3>
    </div>
    );
  }

}
