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
      }
    ];
  }

  render() {
    return (
      <Grid padded stackable className='filling'>
        <Grid.Row>
          <Grid.Column>
            <Segment basic>
              <h1 className='dark-blue'>Who are we?</h1>
              <h2 className='dark-blue'>We are Mind Mobilizers who love our community and the amazing diversity of talents it has to offer :)</h2>
              <Card.Group stackable itemsPerRow={3}>
                { this._renderProfiles() }
              </Card.Group>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
      extra={<Button as='a' className='white' labelPosition='left' icon='mail' href={`mailto:${email}`} content={email} />}
    />;
  }
}
