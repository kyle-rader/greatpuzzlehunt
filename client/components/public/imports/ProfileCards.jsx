import React, { Component } from 'react';
import { Grid, Segment, Card, Image, Button, Icon } from 'semantic-ui-react';
import { map } from 'lodash';

export default class ProfileCards extends Component {

  constructor(props) {
    super(props);

    this.profiles = [
      {
        name: 'Millie Johnson',
        title: 'Associate Math Professor, WWU',
        role: 'Primary event coordinator, puzzle creator, and founder of the Great Puzzle Hunt',
        email: 'Millie.Johnson@wwu.edu',
        image: '/img/2016/event-photos/millie_johnson.jpg',
      },
      {
        name: 'Wendy Aguilar',
        title: 'Web Design Specialist, CDK Global',
        role: 'Lead designer',
        email: 'agu.wnd@gmail.com',
        image: '/img/team/wendy.jpg',
      },
      {
        name: 'Noah Strong',
        title: '',
        role: 'Lead Developer',
        email: 'noah@greatpuzzlehunt.com',
        image: '/img/team/noah.jpg',
      },
      /* Second Row */
      {
        name: 'Zoe & Jeff',
        title: '',
        role: 'Puzzle Master Team',
        email: 'gphpuzzlemasters@gmail.com',
        image: '/img/team/jeff-zoe.jpg',
      },
      {
        name: 'Zac Pontrantolfi',
        title: '',
        role: 'Puzzle Master Team',
        email: 'Zac.Pontrantolfi@gmail.com',
        image: '/img/team/zac.jpg',
      },
      {
        name: 'Alex Covington',
        title: '',
        role: 'Developer',
        email: '',
        image: '/img/team/alex_c.jpg',
      },
      {
        name: 'Jordan King',
        title: '',
        role: 'Co-President',
        email: '',
        image: '/img/team/jordan_k.jpg',
      },
      {
        name: 'Elias Peters',
        title: '',
        role: 'Co-President',
        email: '',
        image: '/img/team/elias_p.jpg',
      },
      {
        name: 'Katrina Duttkin',
        title: '',
        role: 'Marketing and Promotions',
        email: '',
        image: '/img/team/katrina.jpg',
      },
      {
        name: 'Danielle Glewwe',
        title: '',
        role: 'Marketing and Promotions',
        email: '',
        image: '/img/team/danielle_g.jpg',
      },
      {
        name: 'Miranda Reed',
        title: '',
        role: 'Co-Budget Coordinator',
        email: '',
        image: '/img/team/miranda_r.jpeg',
      },
      {
        name: 'Alex Kuhn',
        title: '',
        role: 'Co-Budget Coordinator',
        email: '',
        image: '/img/team/',
      },
    ];
  }

  render() {
    return (
      <Card.Group stackable doubling itemsPerRow={3}>
        { this._renderProfiles() }
      </Card.Group>
    );
  }

  _renderProfiles() {
    return map(this.profiles, (profile) => this._renderProfileCard(profile));
  }

  _renderProfileCard({ name, title, role, email, image }) {
    return <Card key={name}
      image={image}
      header={name}
      meta={title}
      description={role}
      extra={<a href={`mailto:${email}`}>{email}</a>}
    />;
  }
}
