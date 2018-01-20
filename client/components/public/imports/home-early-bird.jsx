import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Segment, Container, Image, Header, Button } from 'semantic-ui-react';
import LinkButton from '../../imports/link-button';
export default class HomeEarlyBird extends Component {
  render() {
    return (
      <section id="home-early-bird">
        <Segment inverted color='blue' style={{ padding: '10em 0em', margin:'0'}}>
          <Grid   stackable   >
           <Grid.Row centered verticalAlign="top">
             <Grid.Column width={8} >
               <Image fluid src="/img/2016/event-photos/station1.jpg"/>
             </Grid.Column>
             <Grid.Column width={6}  >
               <Segment inverted color='blue' textAlign='left'>
                 <Header as="h1" style={{ color: 'white'}} >Early Bird Registration Through March 10th 2018</Header>
                 Student   $5<br/><br/>
                 Non-Student   $10<br/><br/><br/>
               </Segment>
                <Segment  inverted color='blue' padded textAlign='left'>
                  <Header as="h1" style={{ color: 'white'}} >Regular Registration</Header>
                  March 11 - 30, 2017<br/><br/>
                  Student   $8<br/><br/>
                  Non-Student   $15<br/><br/>
                  * Registration prices are per person. Each person wanting to join a team must register themselves first.
                </Segment>
                <LinkButton to='/register' size='massive' content='Register'/>
              </Grid.Column>
           </Grid.Row>
         </Grid>
     </Segment>
      <Image fluid src="/img/2016/event-photos/team-saxaphone-bugs-thin.jpg"/>
    </section>

    );
  }
}
