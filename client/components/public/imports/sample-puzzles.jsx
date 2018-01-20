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
      <section className="pattern-bg">
      <Grid padded text-align="left" stackable style={{ padding: '10em 0em', margin:'0'}} >
        <Grid.Row centered >
          <Grid.Column width={10}>
          <Container>
            <Header size="huge">
              Sample Puzzles (from the 2016 hunt)
            </Header>
            Below You can find some of the past Puzzles. Download them and try to solve them for yourself.
          </Container>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={2}>
          <Grid.Column width={8} >
            <Card.Group itemsPerRow={2}>
              { this._puzzles() }
           </Card.Group>
        </Grid.Column>
        </Grid.Row>
      </Grid>
       <Image fluid src="/img/2016/event-photos/team-mod-thin.jpg"/>
    </section>
    )
  }


  _puzzles() {
    return this.puzzles.map((puzzle) => (
          <Card padded color='teal' key={ puzzle.link }>
            <Card.Header as='h1'>{ puzzle.name }</Card.Header>
            <Card.Description><br/><br/> { puzzle.tagline }<br/><br/></Card.Description>
            <Button className='dark-blue' as='a' href='_blank' href={`/puzzles/2016/${puzzle.link}`} content='Download'/>
         </Card>
    ));
  }
}
