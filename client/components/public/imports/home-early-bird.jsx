import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Segment, Container, Image, Header, Button } from 'semantic-ui-react';
import LinkButton from '../../imports/link-button';
export default class HomeEarlyBird extends Component {
  render() {
    return (
      <section id="home-early-bird">
        <Segment inverted color='blue' style={{ padding: '10em 0em', margin:'0'}} className="no-border-radius">
          <Grid   stackable  textAlign='left' >
           <Grid.Row centered verticalAlign="top">
             <Grid.Column width={8} >
               <Image fluid src="/img/2016/event-photos/station1.jpg"/>
             </Grid.Column>
             <Grid.Column width={6}  >
               <Segment inverted color='blue' className="no-border-radius" >
                 <Header as="h1" size="huge"  >Early Bird Registration Until March 18th 2018</Header>
                 Student   $5<br/><br/>
                 Non-Student   $10<br/><br/><br/>
               </Segment>
                <Segment  inverted color='blue' padded className="no-border-radius">
                  <Header as="h1" size='huge' style={{ color: 'white'}} >Regular Registration</Header>
                  March 19 - April 12, 2018<br/><br/>
                  Student   $8<br/><br/>
                  Non-Student   $15<br/><br/>
                  * Registration prices are per person. Each person wanting to join a team must register themselves first.
                </Segment>
                <LinkButton to='/register' size='huge' content='Register'/>
              </Grid.Column>
           </Grid.Row>
         </Grid>
     </Segment>
      <Image fluid src='/img/2016/event-photos/team-theres-waldo-thin.jpeg'/>
    </section>

    );
  }
}
