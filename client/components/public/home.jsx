import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Container, Header, Icon, Button } from 'semantic-ui-react';

import HomeHeader from './imports/home-header';
import WelcomeSection from './imports/welcome-section';
import EventDescription from './imports/event-description';
import SponsorLevels from './imports/sponsor-levels';
import Sponsors from './imports/sponsors';
import EventDescription2 from './imports/event-description-2';
import RegistrationInfo from './imports/registration-info';
import SamplePuzzles from './imports/sample-puzzles';
import ProfileCards from './imports/profile-cards';

Home = class Home extends Component {

  _renderGallerySection() {
    return (
    <div className="one column stacking row">
      <div className="dark-blue column">
        <div className="ui very padded basic segment">
          <h1>Take a look at past events</h1>
          <h3>Photography courtesy of Gabrielle Poncz</h3>
          <Link className="ui large white button" to="/gallery">View Gallery</Link>
        </div>
      </div>
    </div>
    );
  }

  render() {
    return (
    <Container>

      <HomeHeader/>
      <WelcomeSection/>
      <EventDescription/>
      <SponsorLevels/>
      <br/>
      <Sponsors />
      <EventDescription2/>
      <RegistrationInfo/>
      <SamplePuzzles/>
      <ProfileCards />

      <div className="ui padded stackable filling grid">


        {this._renderGallerySection()}

        <div className="three column stacking row">
          <div className="no-padding column">
            <img className="ui image" src="/img/2016/event-photos/team-church-of-put-it-backism.jpg"/>
          </div>
          <div className="no-padding column">
            <img className="ui image" src="/img/2016/event-photos/team-finesse.jpg"/>
          </div>
          <div className="no-padding column">
            <img className="ui image" src="/img/2016/event-photos/team-mod.jpg"/>
          </div>
        </div>

      </div>

    </Container>
    );
  }
}
