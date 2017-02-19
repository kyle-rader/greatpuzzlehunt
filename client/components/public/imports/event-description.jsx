import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Segment, Header, Button, Icon } from 'semantic-ui-react';
import LinkButton from '../../imports/link-button';

export default class EventDescription extends Component {
  render() {
    return (
    <Grid padded stackable className='filling'>
      <Grid.Row>
        <Grid.Column>
          <Segment basic className='dark-blue'>
            <Header as='h1' className='dark-blue'>What is the Puzzle Hunt?</Header>
            <h3>
              The Great Puzzle Hunt is like a scavenger hunt adventure with puzzles.  Teams travel on foot to various locations
              solving a total of four hour-long puzzles gathering clues along the way to solve one final meta puzzle.
            </h3>
            <h3>
              These are no ordinary puzzles though! It will take a diverse set of skills and talents to solve them!
              Our mission is to celebrate everyone's talents and demonstrate knowledge comes in many forms.
            </h3>
            <h3>
              Everything is timed using your phone, QR codes, and this online system! So yes you can win :)
            </h3>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    );
  }
}
