import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Segment, Container, Image, Header, Button } from 'semantic-ui-react';
import LinkButton from '../../imports/LinkButton';
export default class HomePastEvents extends Component {
  render() {
    return (
      <section id="HomePastEvents">
        <Segment inverted color='blue' style={{ padding: '10em 0em', margin:'0'}}>
          <Grid   stackable   >
           <Grid.Row centered verticalAlign="middle">
             <Grid.Column width={10}>
               <Segment inverted color='blue' >
                 <Header as="h1" size='huge'>Take a look at past events</Header>
                 Photography courtesy of
                   <a  style={{color:'white'}} href="http://www.gabrielleponcz.com/"> Gabrielle Ponz.</a>
              </Segment>
             </Grid.Column>
           </Grid.Row>
           <Grid.Row  centered verticalAlign="middle">
             <Button className='dark-blue' as='a' href='_blank' href={`/gallery`} content='View Gallery' />
           </Grid.Row>
           <Grid.Row columns={3}>
             <Grid.Column>
               <Image src="/img/2016/event-photos/team-finesse.jpg" />
             </Grid.Column>
             <Grid.Column>
               <Image src="/img/2016/event-photos/team-church-of-put-it-backism.jpg" />
             </Grid.Column>
             <Grid.Column>
               <Image src="/img/2016/event-photos/team-grunts-for-grants.jpg" />
             </Grid.Column>
           </Grid.Row>
         </Grid>

     </Segment>

    </section>

    );
  }
}
