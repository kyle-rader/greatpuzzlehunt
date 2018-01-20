import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Container, Header, Icon, Button } from 'semantic-ui-react';

import HomeHeader from './imports/home-header';
import HomeIntro from './imports/home-intro';
import HomeEarlyBird from './imports/home-early-bird';
import HomePastEvents from './imports/home-past-events';
import HomeWhoAreWe from './imports/home-who-are-we';
import HomeSponsorLevels from './imports/home-sponsor-levels';
import SamplePuzzles from './imports/sample-puzzles';

Home = class Home extends Component {
  render() {
    return (
      <div>
        <HomeHeader/>

        <HomeIntro/>

        <HomeEarlyBird/>

        <HomeSponsorLevels/>

        <SamplePuzzles/>

        <HomePastEvents/>

        <HomeWhoAreWe/>

      </div>
    );
  }
}
