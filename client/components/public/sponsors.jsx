import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Segment, Header, Icon, Card, Image } from 'semantic-ui-react';
import { filter } from 'lodash';

Sponsors = class Sponsors extends Component {
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
    <div className="one column stacking row">
      <div className="column">
        <Segment basic>
          <br/>
          <Header className='dark-blue' size='huge' content='A Huge Thank You to Our 2017 Sponsors!'/>

          { this._renderSections() }
        </Segment>
      </div>
    </div>
    );
  }

  _renderSections() {
    return this.sections.map((section) => this._renderSponsorSection(section));
  }

  _renderSponsorSection({ title, rank }) {
    const sponsors = this._renderLogos({ rank });
    let content = null;

    if (sponsors.length === 0) {
      content = <Header size='small' content={`Join as a ${title} sponsor today!`}/>
    } else {
      content = <Image.Group size='medium'>{ sponsors }</Image.Group>;
    }

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
