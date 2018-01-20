import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Grid, Segment, Header, Icon, Card, Image } from 'semantic-ui-react';
import { filter } from 'lodash';

export default class Sponsors extends Component {
  constructor(props) {
    super(props);

    this.sponsors = [
      {
        name: 'WECU',
        logo: '/img/2017/sponsor-logos/wecu.png',
        rank: 3,
      },
      {
        name: 'anonymous',
        logo: '/img/2017/sponsor-logos/anonymous-logo.png',
        rank: 1,
        width: 250,
      },
      {
        name: 'woods',
        logo: '/img/2017/sponsor-logos/woods-logo.jpg',
        rank: 1,
        width: 250,
      },
      {
        name: 'anonymous2',
        logo: '/img/2017/sponsor-logos/anonymous-logo.png',
        rank: 2,
        width: 250,
      },
      {
        name: 'Toyota of Bellingham',
        logo: '/img/2017/sponsor-logos/toyota_logo.png',
        rank: 1,
        width: 250,
      },
      {
        name: 'Richard Golding & Craig Cruz',
        logo: '/img/2017/sponsor-logos/richard-craig.png',
        rank: 4,
        width: 250,
      },
      {
        name: 'Haggen',
        logo: '/img/2017/sponsor-logos/haggen.png',
        rank: 4,
        width: 250,
      }
    ];

    this.rankLogoMap = { 1: 'puzzle', 2: 'crop', 3: 'code', 4: 'trophy' };

    this.sections = [
      {
        title: 'Puzzle Master',
        rank: 4,
      },
      {
        title: 'Cipher',
        rank: 3,
      },
      {
        title: 'Crossword',
        rank: 2,
      },
      {
        title: 'Jigsaw',
        rank: 1,
      },
    ];
  }

  render() {
    return (
      <div>
        { this._renderLogos(this.props) }
      </div>
    );
  }


  _renderLogos({ rank }) {
    return sponsors = filter(this.sponsors, (s) => s.rank === rank).map((sponsor, i) => (
        <Segment style={{ textAlign: 'center'}} key={`sponsor-segment-${i}`}>
          <Image
            key={ sponsor.name }
            src={ sponsor.logo }
            centered
            verticalAlign='middle'
            label={<small>{sponsor.level}</small>}
            spaced
          />
        </Segment>
      )
    );
  }
}
