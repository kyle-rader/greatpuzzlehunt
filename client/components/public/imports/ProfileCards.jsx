import React, { Component } from 'react';
import { Grid, Segment, Card, Image, Button, Icon } from 'semantic-ui-react';
import { map } from 'lodash';

export default class ProfileCards extends Component {

  constructor(props) {
    super(props);

    this.currentProfiles = [
      {
        name: 'Millie Johnson',
        title: 'Associate Math Professor, WWU',
        role: 'Primary event coordinator, puzzle creator, and founder of the Great Puzzle Hunt',
        image: '/img/2016/event-photos/millie_johnson.jpg',
      },
      {
        name: 'Wendy Aguilar',
        title: 'Web Design Specialist, CDK Global',
        role: 'Lead designer',
        image: '/img/team/wendy.jpg',
      },
      {
        name: 'Noah Strong',
        title: '',
        role: 'Lead Developer',
        image: '/img/team/noah.jpg',
      },
      /* Second Row */
      {
        name: 'Zac Pontrantolfi',
        title: '',
        role: 'Puzzle Master Team',
        image: '/img/team/zac.jpg',
      },
      {
        name: 'Alex Covington',
        title: '',
        role: 'Developer',
        image: '/img/team/alex_c.jpg',
      },
      {
        name: 'Jordan King',
        title: '',
        role: 'AS Club Co-President',
        image: '/img/team/jordan_k.jpg',
      },
      {
        name: 'Elias Peters',
        title: '',
        role: 'AS Club Co-President',
        image: '/img/team/elias_p.jpg',
      },
      {
        name: 'Katrina Duttkin',
        title: '',
        role: 'AS Marketing and Promotions',
        image: '/img/team/katrina.jpg',
      },
      {
        name: 'Patrick Carroll',
        title: '',
        role: 'AS Marketing and Promotions',
        image: '/img/team/patrick_c.jpg',
      },
      {
        name: 'Danielle Glewwe',
        title: '',
        role: 'AS Marketing and Promotions',
        image: '/img/team/danielle_g.jpg',
      },
      {
        name: 'Miranda Reed',
        title: '',
        role: 'AS Co-Budget Coordinator',
        image: '/img/team/miranda_r.jpeg',
      },
      {
        name: 'Alex Kuhn',
        title: '',
        role: 'AS Co-Budget Coordinator',
        image: '/img/team/alex_k.jpg',
      },
    ];
    this.pastProfiles = [
      {
        name: 'Kyle Rader',
        title: '',
        role: 'Lead developer and secondary event coordinator',
        image: '/img/team/kyle.jpg',
      },
      {
        name: 'Zoe & Jeff',
        title: '',
        role: 'Puzzle Master Team',
        image: '/img/team/jeff-zoe.jpg',
      },
      {
        name: 'Scott St. Clair',
        title: '',
        role: 'AS Club President 2017-18',
        image: '/img/team/scott.jpg',
      },
    ]
  }

  render() {
    return (
      <div>
        <h1>Our Leadership</h1>
        <Card.Group stackable doubling itemsPerRow={3}>
          { this._renderProfiles(this.currentProfiles) }
        </Card.Group>

        <h1>Past Leadership</h1>
        <Card.Group stackable doubling itemsPerRow={3}>
          { this._renderProfiles(this.pastProfiles) }
        </Card.Group>
      </div>
    );
  }

  _renderProfiles(profiles) {
    return map(profiles, (profile) => this._renderProfileCard(profile));
  }

  _renderProfileCard({ name, title, role, image }) {
    return <Card key={name}
      image={image}
      header={name}
      meta={title}
      description={role}
    />;
  }
}
