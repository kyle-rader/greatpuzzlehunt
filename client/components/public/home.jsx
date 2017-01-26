import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Header, Icon, Button } from 'semantic-ui-react';

Home = class home extends Component {

  componentDidMount() {
    const video = $(this.refs['embedded-video']);

    video.embed({
      source      : 'vimeo',
      id          : '181258972',
    });

    $('html, body').scrollTop(0);
  }

  _renderBlueSpacer() {
    return (
    <div className="one column stacking row">
      <div className="dark-blue column">
        <div className="ui basic segment">
        </div>
      </div>
    </div>
    );
  }

  _renderHeader() {
    return (
      <div className="header-main">
        <div className="header-text -left">
          <div className="extra-text red-text">The Second Annual</div>
          WWU Great
          <img className="footprints" src="/img/footprints-left.png"/>
        </div>
        <img src="/img/logo-color-512.png"/>
        <div className="header-text -right">
          <img className="footprints" src="/img/footprints-right.png"/>
          Puzzle Hunt
          <div className="extra-text"><strong><span className="dark-blue">Mobilizing</span> <span className="blue-text">Minds</span></strong></div>
        </div>
      </div>
    );
  }

  _renderIntroSection() {
    return (
    <div className="two column stacking row">
      <div className="no-padding ten wide column">
        <img className="ui image" src="/img/2016/event-photos/gathering.jpg"/>
      </div>
      <div className="dark-blue six wide column">
        <div className="ui basic segment">
          <h1>Grab Some Friends<br/>and Have an Adventure!</h1>
          <h2>Solve Puzzles and Win Prizes!</h2>
          <div className="buttons">
            <Link className="ui large green button" to="/register">
              Register
            </Link>
            <Link className="ui large blue button" to="/login">
              Log In
            </Link>
            <Link className="ui large orange button" to="/info">
              More Info
            </Link>
          </div>
          <div className="ui relaxed large list">
            <div className="item">
              <i className="large calendar icon"></i>
              <div className="content">
                April 1, 2017 &nbsp;|&nbsp; 10:00 AM
              </div>
            </div>
            <div className="item">
              <i className="large white marker icon"></i>
              <div className="white content">
                Western Washington University<br/>
                516 High Street<br/>
                Bellingham, WA 98225<br/><br/>

                <a className="ui small white right labeled icon button" target="_blank" href="https://www.google.com/maps/place/Western+Washington+University/@48.738511,-122.4878197,17z/data=!3m1!4b1!4m5!3m4!1s0x5485a3ca4cc915cd:0xa84926de4cbaf2c0!8m2!3d48.738511!4d-122.485631">
                  <i className="google icon"></i>
                  Google Maps
                </a>
              </div>
            </div>
            <div className="item">
              <i className="large photo icon"></i>
              <div className="content">
                Photo Credit<br/><br/>
                <a className="ui small white button" target="_blank" href="http://www.gabrielleponcz.com/">Gabrielle Poncz Photography</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

  _renderDescriptionSection() {
    return (
    <div className="one column stacking row">
      <div className="column">
        <div className="ui dark-blue basic container segment">
          <h1 className="ui dark-blue header">What is the Puzzle Hunt?</h1>
          <p className="h3">
            The Great Puzzle Hunt is like a scavenger hunt adventure with puzzles.  Teams travel on foot to various locations
            solving a diverse set of puzzles gathering clues along the way to solve one final meta puzzle.
          </p>
          <p className="h3">
            Everything is timed using your phone, QR codes, and this online system! So yes you can win :)
          </p>
          <Header as='h3' className="dark-blue">
            <Icon name='hand paper' color='violet'/>
            <Header.Content>
              <Button color='violet' style={{marginBottom: '10px'}} content={<Link to='/register' style={{color: '#fff'}}>Sign up to Volunteer now</Link>}/>
              <br/>
              We need awesome people like you to help make the magic happen!
            </Header.Content>
          </Header>
          <p className="h2">Check out the video below to see last year's puzzle hunt in action!</p>
        </div>
      </div>
    </div>
    );
  }

  _renderVideoSection() {
    return (
    <div className="one column stacking row">
      <div className="no-padding column">
        <div ref="embedded-video" className="ui embed"></div>
      </div>
    </div>
    );
  }

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

      {this._renderHeader()}

      <div className="ui padded stackable filling grid">

        {this._renderIntroSection()}

        {this._renderDescriptionSection()}

        {this._renderVideoSection()}

        <SponsorLevels />

        <Sponsors />

        <div className="one column stacking row">
          <div className="no-padding column">
            <img className="ui image" src="/img/2016/event-photos/team-saxaphone-bugs-thin.jpg"/>
          </div>
        </div>

        {this._renderDescription2()}

        {this._renderRegistrationSection()}

        {this._renderBlueSpacer()}

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

        {this._renderBlueSpacer()}

      </div>

    </div>
    );
  }
}
