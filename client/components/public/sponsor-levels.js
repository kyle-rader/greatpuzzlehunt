import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';

SponsorLevels = class SponsorLevels extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="one column stacking row">
      <div className="dark-blue column">
        <Segment basic>
          <h1>
            Help Support the Event by Becoming a Sponsor
          </h1>
          <div className="ui horizontal stackable list">
            <div className="item">
              <a className="item ui large red labeled icon button" target="_blank" href="https://securelb.imodules.com/s/1710/campaign/index-noshare.aspx?sid=1710&gid=2&pgid=467&cid=1175&dids=167&bledit=1">
                Donate Now
                <i className="heart icon"></i>
              </a>
            </div>
            <h3 className="item">
              All donations are tax deductible!
            </h3>
            <div className="item">
              <a className="ui white button" target="_blank" href="http://foundation.wwu.edu/s/1710/campaign/index.aspx?sid=1710&gid=2&pgid=420">
                Donating by check?
              </a>
            </div>
          </div>
          <h1>Sponsorship Levels</h1>
          <div className="ui four column stackable grid">
            <SponsorTitle name="JIGSAW" icon="puzzle" price="$200 - $499" description="Name/Logo on website sponsor list"/>
            <SponsorTitle name="CROSSWORD" icon="crop" price="$500 - $999" description="All from JIGSAW + Name/Logo on t-shirt"/>
            <SponsorTitle name="CIPHER" icon="code" price="$1000 - $1999" description="All from CROSSWORD + Complimentary registration for 6 person team"/>
            <SponsorTitle name="PUZZLE MASTER" icon="trophy" price="$2000+" description="All from CIPHER + Name/Logo on all event materials, advertising, and press releases"/>
          </div>
        </Segment>
      </div>
    </div>
    );
  }
}
