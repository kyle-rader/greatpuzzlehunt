import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Container, Header, Icon, Button } from 'semantic-ui-react';

import HomeHeader from './imports/home-header';
import HomeIntro from './imports/home-intro';
import HomeEarlyBird from './imports/home-early-bird';
import HomePastEvents from './imports/home-past-events';
import HomeWhoAreWe from './imports/home-who-are-we';
import SponsorLevels from './imports/sponsor-levels';
// import Sponsors from './imports/sponsors';
// import EventDescription2 from './imports/event-description-2';
// import RegistrationInfo from './imports/registration-info';
// import SamplePuzzles from './imports/sample-puzzles';
// import GalleryPreview from './imports/gallery-preview';

Home = class Home extends Component {
  render() {
    return (
    <div>
      <HomeHeader/>
      <HomeIntro/>
      <HomeEarlyBird/>
      <SponsorLevels/>
      <SamplePuzzles/>
      <HomePastEvents/>
      <HomeWhoAreWe/>

      {/* <WelcomeSection/> */}
      {/*
      <EventDescription/>
      <SponsorLevels/>
      <br/>

      <Sponsors/>
      <EventDescription2/>
      <RegistrationInfo/>
      <SamplePuzzles/>
      <ProfileCards />
      <GalleryPreview/>
      */}
    </div>
    );
  }
}
