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
        title: 'Software Engineer, Action Sprout',
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
        email: 'scott@gmail.com',
        image: '/img/team/scott.jpg',
      },
      {
        name: 'Jeff & Zoe',
        title: '',
        role: 'Puzzle Master Team',
        email: 'jeff@gmail.com',
        image: '/img/team/jeff-zoe.jpg',
      },
      {
        name: 'Noah Strong',
        title: '',
        role: 'Tech Support',
        email: 'Noah@gmail.com',
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
