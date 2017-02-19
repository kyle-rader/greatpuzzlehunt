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
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header className='dark-blue' size='huge' content='Our Epic 2017 Sponsors!'/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            { this._renderSections() }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  _renderSections() {
    return this.sections.map((section) => this._renderSponsorSection(section));
  }

  _renderSponsorSection({ title, rank }) {
    const sponsors = this._renderLogos({ rank });
    let content = null;

    if (sponsors.length === 0) {
      return null;
    }

    content = <Image.Group size='medium'>{ sponsors }</Image.Group>;

    return (
      <Segment basic key={title}>
        <Header className='dark-blue' size='medium' icon={<Icon name={this.rankLogoMap[rank]} color='black'/>} content={`${title} Sponsors`}/>
        { content }
      </Segment>
    );
  }

  _renderLogos({ rank }) {
    return sponsors = filter(this.sponsors, (s) => s.rank === rank)
      .map((sponsor) =>
        <Image
          key={sponsor.name}
          src={sponsor.logo}
          centered
          verticalAlign='middle'
          label={<small>{sponsor.level}</small>}
          spaced
        />
      );
  }
}
