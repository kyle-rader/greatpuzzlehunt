import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Grid, Container, Image, Header, Segment, Button, Icon, List, Embed } from 'semantic-ui-react';
import LinkButton from '../../imports/link-button';
import RowBuffer from './row-buffer';

export default class HomeIntro extends Component {
  render() {
    return (
      <div className="pattern-bg" id="home-intro">

      <Grid padded stackable centered textAlign='left'  >
        <Grid.Row>
          <Grid.Column width={10} className='raised'>
            <Embed id='LYzpNT-vX7s' source='youtube'/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8} className='raised'>
            <Container textAlign='left'>
              <Header size='huge'>What is the Puzzle Hunt?</Header>
              <p>
                The Great Puzzle Hunt is like a scavenger hunt adventure with puzzles. Teams travel on foot to various locations solving a total of four hour-long puzzles gathering clues along the way to solve one final meta puzzle.
              </p>
              <br/>
              <p>
                These are no ordinary puzzles though! It will take a diverse set of skills and talents to solve them! Our mission is to celebrate everyone's talents and demonstrate knowledge comes in many forms. Everything is timed using your phone, QR codes, and this online system! So yes you can win :)
              </p>
            </Container>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={4}>
            <Segment  inverted color='blue' >
              <Header as='h1' size="medium">Who?</Header>
              Everyone! However, each person under age 14 on a team must be accompanied by a parent/legal guardian at all times - parent/legal guardian must be registered on team with child under age 14. *Note: The puzzles are $nbsp created for ages 14 and older.
            </Segment>
            <Segment padded inverted color='blue' >
              <Header as='h1' size="medium">Where?</Header>
              At Red Square<br/>
              Western Washington University<br/>
              516 High Street<br/>
              Bellingham, WA 98225<br/><br/>
            </Segment>
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment padded inverted color='blue' >
              <Header as='h1' size="medium" >What?</Header>
              Scavenger hunting, puzzle solving, brain adventuring! More details <a href="/info"> here</a>
            </Segment>
            <Segment padded inverted color='blue' >
              <Header as='h1' size="medium" >Why?</Header>
              Stretch your mental muscles, bond with your teammates, compete alongside people of all ages and walks of life, and have a lot of fun!
            </Segment>
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment padded inverted color='blue' >
              <Header as='h1' size="medium" >When?</Header>
              Saturday, April 14, 2018 from 10AM - 5PM<br/>
              Awards and Prizes* at 4PM<br/>
              *Must be present at awards ceremony to claim prizes, else prizes go to the next place team.<br/>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Image fluid src="/img/2016/event-photos/team-mod-thin.jpg"/>
      </div>
    );
  }
}
