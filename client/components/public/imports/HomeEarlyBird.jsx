import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Segment, Container, Image, Header, Button } from 'semantic-ui-react';
import LinkButton from '../../imports/LinkButton';

const { earlyBirdLastDate, regularRegistrationStart, regularRegistrationEnd } = Meteor.settings.public;

export default class HomeEarlyBird extends Component {
  render() {
    return (
      <section id="home-early-bird">
        <Segment inverted color='blue' style={{ padding: '4em 0em', margin:'0'}} className="no-border-radius">
          <Grid   stackable  textAlign='left' >
           <Grid.Row centered verticalAlign="top">

              <Grid.Column width={8}>
                <Image fluid src="/img/2016/event-photos/station1.jpg"/>
                <Segment basic textAlign="center">
                  <LinkButton to='/register' size='huge' content='Register'/>
                </Segment>
             </Grid.Column>

             <Grid.Column width={6}>

               <Segment inverted color='blue'>
                 <Header as="h1" size="huge">Early Bird Registration Until {earlyBirdLastDate}</Header>
                 Student   $5<br/><br/>
                 Non-Student   $10<br/><br/><br/>
               </Segment>

                <Segment  inverted color='blue'>
                  <Header as="h1" size='huge'>Regular Registration</Header>
                  {regularRegistrationStart} through {regularRegistrationEnd}<br/><br/>
                  Student   $8<br/><br/>
                  Non-Student   $15<br/><br/>
                  * Registration prices are per person. Each person wanting to join a team must register themselves first.
                </Segment>

              </Grid.Column>
           </Grid.Row>
         </Grid>
     </Segment>
      <Image fluid src='/img/2016/event-photos/team-theres-waldo-thin.jpeg'/>
    </section>

    );
  }
}
