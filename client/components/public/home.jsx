import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Header, Icon, Button } from 'semantic-ui-react';

import HomeHeader from './imports/home-header';
import WelcomeSection from './imports/welcome-section';
import EventDescription from './imports/event-description';
import SponsorLevels from './imports/sponsor-levels';
import Sponsors from './imports/sponsors';

Home = class Home extends Component {

  _renderDescription2() {
    return (
    <div className="one column stacking row">
      <div className="column">
        <div className="ui basic segment">
          <br/>
          <div className="ui stackable dark-blue grid">
            <div className="two column row">
              <div className="column">
                <h1>Who?</h1>
                <p>Everyone! However, each person under age 14 on a team must be accompanied by a
                  parent/legal guardian at all times - parent/legal guardian must be registered on
                  team with child under age 14. *Note: The puzzles are created for ages 14 and older.
                </p>
              </div>
              <div className="column">
                <h1>What?</h1>
                <p>Scavenger hunting, puzzle solving, brain adventuring! <Link to="/info">More details here</Link></p>
              </div>
            </div>
            <div className="two column row">
              <div className="column">
                <h1>When?</h1>
                <p>Saturday, April 1, 2017 from 10AM - 3PM<br/>Awards and Prizes at 4PM<br/>At Red Square, Western Washington University</p>
              </div>
              <div className="column">
                <h1>Why?</h1>
                <p>Stretch your mental muscles, bond with your teammates, compete alongside people of all ages and walks of life, and have a lot of fun!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

  _renderRegistrationSection() {
    return (
    <div className="two column stacking row">

      <div className="no-padding dark-blue nine wide column">
        <img className="ui image" src="/img/2016/event-photos/station1.jpg"/>
        <div className="ui basic compact small segment">(Above) A volunteer scanning a team's QR code on their phone to start their puzzle timer</div>
      </div>

      <div className="dark-blue seven wide column">
        <div className="ui basic segment">
          <h2>Early Bird Registration<br/>through March 10, 2017</h2>
          <div className="ui list">
            <div className="item">
              <div className="ui tag label">Student &nbsp; $5</div>
            </div>
            <div className="item">
              <div className="ui tag label">Non-Student &nbsp; $10</div>
            </div>
          </div>
          <h2>Regular Registration<br/>March 11 - 30, 2017</h2>
          <div className="ui list">
            <div className="item">
              <div className="ui tag label">Student &nbsp; $8</div>
            </div>
            <div className="item">
              <div className="ui tag label">Non-Student &nbsp; $15</div>
            </div>
          </div>
          <p>* Registration prices are per person.  Each person wanting to join a team must register themselves first.</p>
          <Link className="ui large green button" to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
    );
  }

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
    <div className="ui container">

      <HomeHeader/>

      <WelcomeSection/>

      <EventDescription/>

      <SponsorLevels/>
      <br/>
      <Sponsors />
      
      <div className="ui padded stackable filling grid">

        <div className="one column stacking row">
          <div className="no-padding column">
            <img className="ui image" src="/img/2016/event-photos/team-saxaphone-bugs-thin.jpg"/>
          </div>
        </div>

        {this._renderDescription2()}


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

    </div>
    );
  }
}
