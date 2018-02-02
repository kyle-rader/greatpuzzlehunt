import React, { Component, PropTypes } from 'react';
import { Grid, Segment, Container, Image, Header, Button } from 'semantic-ui-react';
import ProfileCards from './ProfileCards';
export default class HomePeople extends Component {
  render() {
    return (
      <section className="pattern-bg" id="HomePeople">

          <Grid  style={{ padding: '10em 0em 0 0', margin:'0'}}>
           <Grid.Row centered textAlign='left' verticalAlign="middle">
             <Grid.Column width={16} >
               <Header size="huge">Who Are we?</Header>
               <Container>We are Mind Mobilizers who love our community and the amazing diversity of talents it has to offer :)</Container>
             </Grid.Column>
           </Grid.Row>
           <Grid.Row  centered >
             <Grid.Column width={16}>
              <ProfileCards/>
              </Grid.Column>
           </Grid.Row>
         </Grid>
       <Image fluid src="/img/2016/event-photos/gathering-thin.jpg"/>
    </section>

    );
  }
}
