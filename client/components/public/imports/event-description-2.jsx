import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Segment, Header, Button, Icon, Image } from 'semantic-ui-react';

export default class EventDescription2 extends Component {
  render() {
    return (
    <Grid padded stackable doubling>
      <Grid.Row>
        <Grid.Column>
          <Image src="/img/2016/event-photos/team-mod-thin.jpg"/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column>
            <h1 className='dark-blue'>Who?</h1>
            <p>Everyone! However, each person under age 14 on a team must be accompanied by a
              parent/legal guardian at all times - parent/legal guardian must be registered on
              team with child under age 14. *Note: The puzzles are created for ages 14 and older.
            </p>
        </Grid.Column>
        <Grid.Column>
          <h1 className='dark-blue'>What?</h1>
          <p>Scavenger hunting, puzzle solving, brain adventuring! <Link to="/info">More details here</Link></p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column>
          <h1 className='dark-blue'>When?</h1>
          <p>Saturday, April 1, 2017 from 10AM - 3PM<br/>Awards and Prizes at 4PM<br/>At Red Square, Western Washington University</p>
        </Grid.Column>
        <Grid.Column>
          <h1 className='dark-blue'>Why?</h1>
          <p>Stretch your mental muscles, bond with your teammates, compete alongside people of all ages and walks of life, and have a lot of fun!</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    );
  }
}
