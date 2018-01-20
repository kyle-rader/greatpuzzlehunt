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
        logo: '/img/2017/sponsor-logos/wecu.jpg',
        rank: 2,
      },
      {
        name: 'ActionSprout',
        logo: '/img/2017/sponsor-logos/actionsprout.png',
        rank: 4,
      },
      {
        name: 'WWU CSE',
        logo: '/img/2017/sponsor-logos/wwu_cse.png',
        rank: 2,
      },
      {
        name: 'WWU Book Store',
        logo: '/img/2017/sponsor-logos/wwu_bookstore.jpg',
        rank: 1,
        width: 250,
      },
      {
        name: 'Woods Coffee',
        logo: '/img/2017/sponsor-logos/woods_logo.png',
        rank: 2,
        width: 275,
      },
      {
        name: 'WWU Associated Students',
        logo: '/img/2017/sponsor-logos/as_logo.png',
        rank: 3,
        width: 200,
      },
      {
        name: 'Toyota of Bellingham',
        logo: '/img/2017/sponsor-logos/toyota_logo.png',
        rank: 1,
        width: 250,
      },
      {
        name: 'Faith & Paul Komarek',
        logo: '/img/2017/sponsor-logos/faith_and_paul_komarek_logo.png',
        rank: 4,
        width: 250,
      },
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
    return sponsors = filter(this.sponsors, (s) => s.rank === rank)
      .map((sponsor) =>
        <Segment style={{ textAlign: 'center'}}>
        <Image
          size="tiny"
          key={ sponsor.name }
          src={ sponsor.logo }
          centered
          verticalAlign='middle'
          label={<small>{sponsor.level}</small>}
          spaced
        />
        </Segment>
      );
  }
}
