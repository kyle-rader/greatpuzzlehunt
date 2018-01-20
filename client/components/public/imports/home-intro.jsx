import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Container, Image, Card, Header, Segment, Button, Icon, List, Embed } from 'semantic-ui-react';
import LinkButton from '../../imports/link-button';
import RowBuffer from './row-buffer';
import Vimeo from './vimeo';

export default class HomeIntro extends Component {
  render() {
    return (
    <section className="pattern-bg" id="home-intro">

    <Grid  padded stackable centered textAlign='left'  >
     <Grid.Row >
       <Grid.Column width={10} className='raised'>
         <Vimeo vimeo_id='181258972' source='vimeo'/>
         {/* <Embed
           id='181258972'
           placeholder='/img/2016/event-photos/gathering.jpg'
           source='vimeo'
         /> */}
       </Grid.Column>
     </Grid.Row>
     <Grid.Row>
       <Grid.Column width={8} className='raised'>
         <Container textAlign='left'>
           <Header size='huge'>What is the Puzzle Hunt?</Header>
The Great Puzzle Hunt is like a scavenger hunt adventure with puzzles. Teams travel on foot to various locations solving a total of four hour-long puzzles gathering clues along the way to solve one final meta puzzle.<br/><br/>
These are no ordinary puzzles though! It will take a diverse set of skills and talents to solve them! Our mission is to celebrate everyone's talents and demonstrate knowledge comes in many forms.
Everything is timed using your phone, QR codes, and this online system! So yes you can win :)
          </Container>
        </Grid.Column>
     </Grid.Row>

     <Grid.Row >
       <Grid.Column width={14}>
       <Card.Group itemsPerRow={3}>
         <Card padded color='teal' >
           <Card.Header as='h1'>Who?</Card.Header>
           <Card.Description>
              Everyone! However, each person under age 14 on a team must be accompanied by a parent/legal guardian at all times - parent/legal guardian must be registered on team with child under age 14. *Note: The puzzles are $nbsp created for ages 14 and older.
          </Card.Description>

        </Card>
        <Card color='teal' >
          <Card.Header as='h1'>What?</Card.Header>
          <Card.Description>
             cavenger hunting, puzzle solving, brain adventuring! More details
             <a href="/info">here</a>
         </Card.Description>

       </Card>
       <Card color='teal' >
         <Card.Header as='h1'>When?</Card.Header>
         <Card.Description>
           Saturday, April 14, 2018 from 10AM - 5PM<br/>
           Awards and Prizes* at 4PM<br/>
           At Red Square, Western Washington University, Bellingham, WA<br/>
*Must be present at awards ceremony to claim prizes, else prizes go to the next place team.<br/>
        </Card.Description>

      </Card>
         <Card color='teal' >
           <Card.Header as='h1'>When?</Card.Header>
           <Card.Description>
             Western Washington University<br/>
             516 High Street<br/>
             Bellingham, WA 98225<br/><br/>
          </Card.Description>

        </Card>
        <Card color='teal' >
          <Card.Header as='h1'>Why?</Card.Header>
          <Card.Description>
             Stretch your mental muscles, bond with your teammates, compete alongside people of all ages and walks of life, and have a lot of fun!
         </Card.Description>

       </Card>
        </Card.Group>
      </Grid.Column>

     </Grid.Row>
 </Grid>
 <Image fluid src="/img/2016/event-photos/team-mod-thin.jpg"/>
</section>
    );
  }
}
