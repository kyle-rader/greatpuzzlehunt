import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Segment, Header, Button, Icon, Image } from 'semantic-ui-react';

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
      <Grid padded stackable className='filling'>
        <Grid.Row>
          <Grid.Column>
            <Image src="/img/2016/event-photos/team-theres-waldo-thin.jpeg"/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment basic>
              <h1 className='dark-blue'>Sample Puzzles (from the 2016 hunt)</h1>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          { this._puzzles() }
        </Grid.Row>
      </Grid>
    )
  }

  _puzzles() {
    return this.puzzles.map((puzzle) => (
      <Grid.Column key={ puzzle.link }>
        <Segment basic>
          <h2 className='dark-blue'>{ puzzle.name }</h2>
          <p className='dark-blue'>{ puzzle.tagline }</p>
          <Button className='dark-blue' as='a' href='_blank' href={`/puzzles/2016/${puzzle.link}`} content='Download'/>
        </Segment>
      </Grid.Column>
    ));
  }
}
