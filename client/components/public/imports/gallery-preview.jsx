import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Segment, Image } from 'semantic-ui-react';
import LinkButton from '../../imports/link-button';

export default class GalleryPreview extends Component {
  render() {
    return (
    <Grid padded stackable className='filling'>

      <Grid.Row>
        <Grid.Column className='dark-blue'>
          <Segment basic>
            <h1>Take a look at past events</h1>
            <h3>Photography courtesy of Gabrielle Poncz</h3>
            <LinkButton className='white button' to='/gallery' content='View Gallery'/>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={3}>
        <Grid.Column className='no-padding'>
          <Image src="/img/2016/event-photos/team-church-of-put-it-backism.jpg"/>
        </Grid.Column>
        <Grid.Column className='no-padding'>
          <Image src="/img/2016/event-photos/team-finesse.jpg"/>
        </Grid.Column>
        <Grid.Column className='no-padding'>
          <Image src="/img/2016/event-photos/team-mod.jpg"/>
        </Grid.Column>
      </Grid.Row>

    </Grid>
    );
  }
}
