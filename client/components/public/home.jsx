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

Home = class Home extends Component {

  _renderSamplePuzzlesSection() {
    return (
    <div className="one column stacking row">
      <div className="column">
        <div className="ui padded basic segment">
          <h1>Sample Puzzles (from the 2016 hunt)</h1>
          <div className="ui stackable dark-blue grid">
            <div className="two column row">
              <div className="column">
                <h2>Cite Unseen</h2>
                <p>Visual literature</p>
                <a className="ui dark-blue button" target="_blank" href="/puzzles/Cite Unseen FINAL.pdf">Download</a>
              </div>
              <div className="column">
                <h2>Fold and Behold</h2>
                <p>Folding and geometry</p>
                <a className="ui dark-blue button" target="_blank" href="/puzzles/Fold AND Behold FINAL.pdf">Download</a>
              </div>
            </div>
            <div className="two column row">
              <div className="column">
                <h2>Stop the Clock</h2>
                <p>Visual numbers, numerals, and logic</p>
                <a className="ui dark-blue button" target="_blank" href="/puzzles/Stop the Clock FINAL.pdf">Download</a>
              </div>
              <div className="column">
                <h2>Time will Tell</h2>
                <p>Music and melody</p>
                <a className="ui dark-blue button" target="_blank" href="/puzzles/Time will tell FINAL.pdf">Download</a>
              </div>
            </div>
            <div className="two column row">
              <div className="column">
                <h2>Meta Puzzle</h2>
                <p>A puzzle that relies on you to solve the first four :)</p>
                <a className="ui dark-blue button" target="_blank" href="/puzzles/Meta Puzzle FINAL.pdf">Download</a>
              </div>
              <div className="column">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

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

      <div className="ui padded stackable filling grid">

        <div className="one column stacking row">
          <div className="no-padding column">
            <img className="ui image" src="/img/2016/event-photos/team-theres-waldo-thin.jpeg"/>
          </div>
        </div>

        {this._renderSamplePuzzlesSection()}

        <ProfileCards />

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
