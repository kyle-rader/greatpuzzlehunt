import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

Home = class home extends Component {

  componentDidMount() {
    const video = $(this.refs['embedded-video']);

    video.embed({
      source      : 'vimeo',
      id          : '179503284',
    });
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
          <div className="extra-text">The Second Annual</div>
          WWU Great
        </div>
        <img src="/img/logo-color-512.png"/>
        <div className="header-text -right">
          Puzzle Hunt
          <div className="extra-text">Mobilizing Minds</div>
        </div>
      </div>
    );
  }

  _renderIntroSection() {
    return (
    <div className="two column stacking row">
      <div className="no-padding ten wide column">
        <img className="ui image" src="/img/hunt2016/gathering.jpg"/>
      </div>
      <div className="dark-blue six wide column">
        <div className="ui basic segment">
          <h1>Grab Some Friends<br/>and Have an Adventure!</h1>
          <h2>Solve Puzzles and Win Prizes!</h2>
          <div className="buttons">
            <a className="ui large green button" href="/register">
              Register
            </a>
            <a className="ui large blue button" href="/login">
              Log In
            </a>
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

                <a className="ui white right labeled icon button" target="_blank" href="https://www.google.com/maps/place/Western+Washington+University/@48.738511,-122.4878197,17z/data=!3m1!4b1!4m5!3m4!1s0x5485a3ca4cc915cd:0xa84926de4cbaf2c0!8m2!3d48.738511!4d-122.485631">
                  <i className="google icon"></i>
                  Google Maps
                </a>
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
            The Great Puzzle Hunt is like a scavenger hunt adventure with puzzles.  Teams travel to various stations
            solving a diverse set of puzzles gathering clues along the way to solve one final meta puzzle.
          </p>
          <p className="h3">
            Everything is timed using your phone, QR codes, and this online system! So yes you can win :)
          </p>
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
        <div ref="embedded-video" class="ui embed"></div>
      </div>
    </div>
    );
  }

  _renderSponsorSection() {
    return (
    <div className="one column stacking row">
      <div className="dark-blue column">

        <div className="ui basic segment">
          <h1>
            Help Support the Event by Becoming a Sponsor
          </h1>
          <div className="ui horizontal stackable list">
            <div className="item">
              <a className="item ui large red labeled icon button" href="https://securelb.imodules.com/s/1710/campaign/index-noshare.aspx?sid=1710&gid=2&pgid=467&cid=1175&dids=167&bledit=1">
                Donate Now
                <i className="heart icon"></i>
              </a>
            </div>
            <h4 className="item">
              All donations are tax deductible!
            </h4>
          </div>
          <div className="ui divider"></div>
          <div className="ui four column stackable grid">
            <SponsorTitle name="JIGSAW" icon="puzzle" price="$200 - $499" description="Name/Logo on website & sponsor list"/>
            <SponsorTitle name="CROSSWORD" icon="crop" price="$500 - $999" description="JIGSAW + Name/Logo on t-shirt & press release"/>
            <SponsorTitle name="CIPHER" icon="code" price="$1000 - $1999" description="CROSSWORD + Complimentary registration for 6 oerson team"/>
            <SponsorTitle name="PUZZLE MASTER" icon="trophy" price="$2000+" description="CIPHER + Name/Logo on all event materials and advertising"/>
          </div>
          <div className="ui divider"></div>

        </div>
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
                <p>Everyone! However, each person under age 14 on a team must be accompanied by a legal guardian at all times.</p>
              </div>
              <div className="column">
                <h1>What?</h1>
                <p>Scavenger hunting, puzzle solving, brain adventuring!</p>
              </div>
            </div>
            <div className="two column row">
              <div className="column">
                <h1>When?</h1>
                <p>Saturday, April 1, 2017 from 10AM - 3PM<br/>Awards and Prizes at 4PM<br/>At Western Washington University</p>
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
        <img className="ui image" src="/img/hunt2016/station1.jpg"/>
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
          <p>* Registration prices are per person.  Each person wanting to join a team must register themsleves first.</p>
          <a className="ui large green button" href="/register">
            Register
          </a>
        </div>
      </div>
    </div>
    );
  }

  _renderSamplePuzzlesSection() {
    return (
    <div className="one column stacking row">
      <div className="column">
        <div className="ui very padded basic segment">
          <h1 className="dark-blue">Sample Puzzles</h1>
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
          <small>Photography courtesy of Gabrielle Poncz</small>
          <a className="ui large white right floated button" href="/gallery">View Gallery</a>
        </div>
      </div>
    </div>
    );
  }

  _renderProfileCard(name, title, role, email, image) {
    return (
    <div className="centered card">
      <div className="image">
        <img src={image}/>
      </div>
      <div className="content">
        <div className="header">{name}</div>
        <div className="meta">
          {title} <br/> <i className="fitted mail icon"></i><a target="_blank" href={`mailto:${email}`}>{email}</a>
        </div>
        <div className="description">
          {role}
        </div>
      </div>
    </div>
    );
  }

  _renderContactSection() {
    return (
    <div className="one column stacking row">
      <div className="dark-blue column">
        <div className="ui padded basic segment">
          <h1>Who are we?</h1>
          <h2>We are movers and shakers who love our community and the amazing diversity of talents it has to offer :)</h2>
        </div>
        <div className="ui basic segment">
          <div className="ui three stackable cards">
            {this._renderProfileCard('Millie Johnson', 'Associate Math Professor, WWU', 'Millie is the primary event coordinator and puzzle creator.', 'Millie.Johnson@wwu.edu', '/img/hunt2016/kyle_and_millie.jpg')}
            {this._renderProfileCard('Kyle Rader', 'Software Engineer, Action Sprout', 'Kyle is the technology wizard and web application author.', 'kyle@kylerader.ninja', '/img/hunt2016/kyle_and_millie.jpg')}
            {this._renderProfileCard('Wendy Aguilar', 'Web Developer, CDK Global', 'Wendy is the designer and has made all of the branding materials.', 'agu.wnd@gmail.com', '/img/logo-color-512.png')}
          </div>
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

        {this._renderSponsorSection()}

        <div className="one column stacking row">
          <div className="no-padding column">
            <img className="ui image" src="/img/hunt2016/team-saxaphone-bugs-thin.jpg"/>
          </div>
        </div>

        {this._renderDescription2()}

        {this._renderBlueSpacer()}

        {this._renderRegistrationSection()}

        {this._renderBlueSpacer()}

        <div className="one column stacking row">
          <div className="no-padding column">
            <img className="ui image" src="/img/hunt2016/team-theres-waldo-thin.jpeg"/>
          </div>
        </div>

        {this._renderSamplePuzzlesSection()}

        {this._renderContactSection()}

        {this._renderGallerySection()}

        <div className="three column stacking row">
          <div className="no-padding column">
            <img className="ui image" src="/img/hunt2016/team-church-of-put-it-backism.jpg"/>
          </div>
          <div className="no-padding column">
            <img className="ui image" src="/img/hunt2016/team-finesse.jpg"/>
          </div>
          <div className="no-padding column">
            <img className="ui image" src="/img/hunt2016/team-mod.jpg"/>
          </div>
        </div>

        {this._renderBlueSpacer()}

      </div>

    </div>
    );
  }
}

OldHome = React.createClass({

    render() {
        return (
        <div className="custom-bg red-square">
            <br/>
            <div className="ui container raised segment grid transparent-bg">
                {/* Puzzle Hunt Title */}
                <div className="row">
                    <div className="column">
                        <div className="puzzle-hunt-title">
                            <h2>The Second Annual</h2>
                            <h1>WWU Great</h1>
                            <a href="/"><img src="img/logo.png" /></a>
                            <h1>Puzzle Hunt</h1>
                            <h2 className="ui wwu-blue header">
                                <i className="calendar icon"></i>
                                Saturday, April 1st, 2017 &nbsp; | &nbsp; 10AM - 3PM
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Home Panels */}
                <div className="two column equal height stackable row">
                    <div className="column">
                        <div className="ui two column grid">
                            <HomePanel
                            title="Register"
                            icon="huge blue user add icon"
                            link="/register"
                            extraText="2017 Registration will open near the end of 2016!"
                            />
                            <HomePanel
                                title="Login"
                                icon="huge green sign in icon"
                                link="/login"
                                extraText="2017 Registration will open near the end of 2016!"
                                />
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui two column grid">
                            <HomePanel
                            title="Info"
                            icon="huge red help icon"
                            link="/info"
                            extraText="This is an event for anyone who wants to join forces and solve epic puzzles!"
                            />
                            <HomePanel
                            title="Puzzles"
                            icon="huge purple puzzle icon"
                            link="/puzzles"
                            extraText="Check out example puzzles!  Teams with diverse skillsets will be advantageous :)"
                            />
                        </div>
                    </div>
                </div>

                <div className="two column equal height stackable row">
                    <div className="column">
                        <div className="ui two column grid">
                            <HomePanel
                            title="Donate"
                            icon="huge violet gift icon"
                            link="https://securelb.imodules.com/s/1710/campaign/index.aspx?sid=1710&gid=2&pgid=467&cid=1175&dids=167&bledit=1"
                            extraText="Your contribution will help make this happen!"
                            newTab="true"
                            />
                            <HomePanel
                                title="Gallery"
                                icon="huge orange photo icon"
                                link="/gallery"
                                extraText="Check out the 2016 puzzle hunt!"
                                newTab="true"
                                />
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui two column grid">
                            <HomePanel
                            title="Contact Us"
                            icon="huge teal mail icon"
                            link="/contact"
                            extraText="Questions about teams, registration, anything!"
                            />
                            <HomePanel
                            title="Share"
                            icon="huge square facebook facebook-blue icon"
                            link="https://www.facebook.com/wwupuzzlehunt/"
                            extraText="Look for the 2017 Puzzle Hunt upcoming on Facebook and invite your friends!"
                            newTab="true"
                            />
                        </div>
                    </div>
                </div>

                <div className="single column row">
                    <div className="column">
                        <h2 className="ui center aligned icon header">
                            <i className="blue bullhorn icon"></i>
                            <div className="content">
                                In The News
                                <div className="sub header"></div>
                            </div>
                        </h2>
                        <div className="ui relaxed items">
                            <a className="item" target="_blank" href="http://www.westernfrontonline.com/2016/04/10/western-hosts-the-first-great-puzzle-hunt/">
                                <h3>April 14, 2016 | &nbsp; Western Front: Western hosts the first Great Puzzle Hunt</h3>
                            </a>
                            <a className="item" target="_blank" href="https://westerntoday.wwu.edu/photos/photos-300-take-part-in-inaugural-great-puzzle-hunt">
                                <h3>April 10, 2016 | &nbsp; Western Today: Photos: 300 take part in inaugural Great Puzzle Hunt</h3>
                            </a>
                            <a className="item" target="_blank" href="https://westerntoday.wwu.edu/news/registration-underway-for-wwu-great-puzzle-hunt-april-9">
                                <h3>March 7, 2016 | &nbsp; Western Front: Registration underway for WWU Great Puzzle Hunt April 9</h3>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
            <br/>
        </div>
        );
    }
});
