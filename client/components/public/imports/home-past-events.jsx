import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Segment, Container, Image, Header, Button } from 'semantic-ui-react';
import LinkButton from '../../imports/link-button';
export default class HomePastEvents extends Component {
  render() {
    return (
      <section id="home-past-events">
        <Segment inverted color='blue' style={{ padding: '10em 0em', margin:'0'}}>
          <Grid   stackable   >
           <Grid.Row centered verticalAlign="middle">
             <Grid.Column width={10} >
               <Header size='huge'>Take a look at past events</Header>
               <Container>Photography courtesy of
                 <a  href="http://www.gabrielleponcz.com/"> Gabrielle Ponz.</a></Container>
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
