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
        name: 'Kyle Rader',
        title: 'Software Engineer, Microsoft',
        role: 'Lead developer and secondary event coordinator',
        email: 'kyle@kylerader.ninja',
        image: '/img/team/kyle.jpg',
      },
      {
        name: 'Wendy Aguilar',
        title: 'Web Design Specialist, CDK Global',
        role: 'Lead designer',
        email: 'agu.wnd@gmail.com',
        image: '/img/team/wendy.jpg',
      },
      {
        name: 'Scott St. Clair',
        title: '',
        role: 'Scott-AS Club President 2017-18',
        email: 'stclais2@wwu.edu',
        image: '/img/team/scott.jpg',
      },
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
        name: 'Noah Strong',
        title: '',
        role: 'Tech Support',
        email: 'support@greatpuzzlehunt.com',
        image: '/img/team/noah.jpg',
      }
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
    return <Card key={email}
      image={image}
      header={name}
      meta={title}
      description={role}
      extra={<a href={`mailto:${email}`}>{email}</a>}
    />;
  }
}
