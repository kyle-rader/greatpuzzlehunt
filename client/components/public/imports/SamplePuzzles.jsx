import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Card, Container, Segment, Header, Button, Icon, Image } from 'semantic-ui-react';

export default class SamplePuzzles extends Component {
  constructor(props) {
    super(props);

    this.puzzles = [
      {
        name: 'Cite Unseen',
        tagline: 'Visual literature',
        link: 'Cite-Unseen.pdf',
      },
      {
        name: 'Fold and Behold',
        tagline: 'Folding and geometry',
        link: 'Fold-and-Behold.pdf',
      },
      {
        name: 'Stop the Clock',
        tagline: 'Visual numbers, numerals, and logic',
        link: 'Stop-the-Clock.pdf',
      },
      {
        name: 'Time will Tell',
        tagline: 'Music and melody',
        link: 'Time-will-Tell.pdf',
      },
    ];
  }


  render() {
    return (
      <section className="pattern-bg" id="SamplePuzzles">
      <Grid padded centered textAlign="left" stackable style={{ padding: '4em 0em', margin:'0'}} >
        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="huge">
              Sample Puzzles (from the 2016 hunt)
            </Header>
            Below You can find some of the past Puzzles. Download them and try to solve them for yourself.
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={4}>
              { this._puzzles() }
        </Grid.Row>

      </Grid>
       <Image fluid src="/img/2016/event-photos/team-the-purple-penguins-thin.jpg"/>
    </section>
    )
  }


  _puzzles() {
    return this.puzzles.map((puzzle, i) => (
      <Grid.Column key={`puzzle-${i}`}>
        <Segment  style={{minHeight:'250px'}} padded inverted color='blue' key={ puzzle.link }>
          <Header as='h1' size="medium">{ puzzle.name }</Header>
          { puzzle.tagline }
          <br/>
          <br/>
          <Button  as='a' href='_blank' href={`/puzzles/2016/${puzzle.link}`} content='Download'/>
        </Segment>
      </Grid.Column>
    ));
  }
}
