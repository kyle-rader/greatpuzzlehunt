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

  _renderHeader() {
    return (
      <div className="header-main">
        <div className="header-text -left">
          <div className="extra-text">The Second Annual</div>
          WWU Great
        </div>
        <img src="/img/logo.png"/>
        <div className="header-text -right">
          Puzzle Hunt
          <div className="extra-text">Mobilizing Minds</div>
        </div>
      </div>
    );
  }

  render() {
    return (
    <div className="ui container">
      {this._renderHeader()}

      <div className="ui padded stackable filling grid">

        <div className="two column stacking row">

          <div className="no-padding nine wide column">
            <img className="ui image" src="/img/hunt2016/gathering.jpg"/>
          </div>

          <div className="dark-blue seven wide column">
            <div className="ui basic segment">
              <h1 className="thin">GRAB SOME FRIENDS<br/>AND HAVE AN ADVENTURE</h1>
              <h2 className="thin">SOLVE PUZZLES AND WIN PRIZES</h2>
              <div className="buttons">
                <a className="ui large green button" href="/register">
                  Register
                </a>
                <a className="ui large blue button" href="/login">
                  Log In
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="one column stacking row">
          <div className="no-padding column">
            <div ref="embedded-video" class="ui embed"></div>
          </div>
        </div>

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
