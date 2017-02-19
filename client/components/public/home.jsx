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
import GalleryPreview from './imports/gallery-preview';

Home = class Home extends Component {
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
      <GalleryPreview/>

    </Container>
    );
  }
}
