import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Container, Header, Icon, Button } from 'semantic-ui-react';

import HomeHeader from './imports/HomeHeader';
import HomeIntro from './imports/HomeIntro';
import HomeEarlyBird from './imports/HomeEarlyBird';
import HomePastEvents from './imports/HomePastEvents';
import HomePeople from './imports/HomePeople';
import HomeDonate from './imports/HomeDonate';
import HomeSponsors from './imports/HomeSponsors';
import SamplePuzzles from './imports/SamplePuzzles';

Home = class Home extends Component {
  render() {
    return (
      <Container>
        <HomeHeader/>

        <HomeIntro/>

        <HomeEarlyBird/>

        <HomeDonate/>

        <a name='sponsors'/>

        <HomeSponsors/>

        <SamplePuzzles/>

        <HomePastEvents/>

        <HomePeople/>
      </Container>
    );
  }
}
