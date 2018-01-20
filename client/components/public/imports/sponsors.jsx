import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Grid, Segment, Header, Icon, Card, Image } from 'semantic-ui-react';
import { filter } from 'lodash';

export default class Sponsors extends Component {
  constructor(props) {
    super(props);

    this.sponsors = [
      {
        name: 'haggen',
        logo: '/img/2018/sponsors/haggen.png',
        rank: 4,
        width: 250,
      },
      {
        name: 'Richard Golding & Craig Cruz',
        logo: '/img/2018/sponsors/richard_craig.png',
        rank: 3,
        width: 250,
      },
      {
        name: 'wecu',
        logo: '/img/2018/sponsors/wecu.png',
        rank: 3,
      },
      {
        name: 'wwu_cse_math',
        logo: '/img/2018/sponsors/wwu_cse_math.png',
        rank: 2,
        width: 250,
      },
      {
        name: 'anonymous',
        logo: '/img/2018/sponsors/anonymous.png',
        rank: 1,
        width: 250,
      },
      {
        name: 'woods',
        logo: '/img/2018/sponsors/woods.jpg',
        rank: 1,
        width: 250,
      },
      {
        name: 'toyota',
        logo: '/img/2018/sponsors/toyota.png',
        rank: 1,
        width: 250,
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
