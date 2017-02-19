import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Segment, Header, Button, Icon, Image } from 'semantic-ui-react';
import LinkButton from '../../imports/link-button';

export default class RegistrationInfo extends Component {
  render() {
    return (
      <Grid stackable padded className='filling'>
        <Grid.Row only='computer'>
          <Grid.Column className='dark-blue'>
            <br/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column className='dark-blue'>
            <Image src='/img/2016/event-photos/station1.jpg'/>
            <Segment basic compact>
              <small>(Above) A volunteer scanning a team's QR code on their phone to start their puzzle timer</small>
            </Segment>
          </Grid.Column>
          <Grid.Column className='dark-blue'>
            <Segment basic>
              <h2>Early Bird Registration<br/>through March 10, 2017</h2>
              <div className='ui list'>
                <div className='item'>
                  <div className='ui tag label'>Student &nbsp; $5</div>
                </div>
                <div className='item'>
                  <div className='ui tag label'>Non-Student &nbsp; $10</div>
                </div>
              </div>
              <h2>Regular Registration<br/>March 11 - 30, 2017</h2>
              <div className='ui list'>
                <div className='item'>
                  <div className='ui tag label'>Student &nbsp; $8</div>
                </div>
                <div className='item'>
                  <div className='ui tag label'>Non-Student &nbsp; $15</div>
                </div>
              </div>
              <p>* Registration prices are per person.  Each person wanting to join a team must register themselves first.</p>
              <LinkButton to='/register' color='green' content='Register Now'/>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
