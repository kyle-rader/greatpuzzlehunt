import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Grid, Segment, Card, Header, Button, Icon, Image, Message } from 'semantic-ui-react';
import LinkButton from '../../imports/link-button';
import SponsorRow from './sponsor-row';

export default class HomeSponsors extends Component {
  render() {
    return (
      <section className="pattern-bg" id="sponsors">
        <Grid centered textAlign="left" padded stackable style={{ padding: '2em 0em', margin:'0'}}>
          {this._sponsors()}
          {this._thanks()}
        </Grid>
        <Image fluid src="/img/2016/event-photos/team-saxaphone-bugs-thin.jpg"/>
      </section>
    );
  }

  _sponsors() {
    return (
      <Grid.Row>
        <Grid.Column width={14}>
          <Header as="h1" size="huge"> Sponsorship Levels</Header>
          <Grid stackable divided='vertically'>
            <SponsorRow
              name="PUZZLE MASTER*"
              level='puzzlemaster'
              icon="trophy" price="$2000+"
              description="All from CIPHER + Name/Logo on all event materials, advertising, and press releases"/>
            <SponsorRow
              level='cipher'
              name="CIPHER*"
              icon="code"
              price="$1000 - $1999"
              description="All from CROSSWORD + Complimentary registration for 6 person team"/>
            <SponsorRow
              name="CROSSWORD"
              level='crossword'
              icon="crop"
              price="$500 - $999"
              description="All from JIGSAW + Name/Logo on t-shirt"/>
            <SponsorRow
              name="JIGSAW"
              level='jigsaw'
              icon="puzzle"
              price="$200 - $499"
              description="Name/Logo on website sponsor list"/>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    );
  }

  _thanks() {
    return [
      <Grid.Row key='sponsor-thanks-1'>
        <Grid.Column width={14}>
          <Message>
            Special thanks to Market Street Catering of <a href="http://www.haggen.com/" target="_blank" >Haggen NW Fresh </a> for providing fresh fruit and breakfast pastries including a  GF option and Woods Coffee for the brew!
          </Message>
        </Grid.Column>
      </Grid.Row>,
      <Grid.Row key='sponsor-thanks-2'>
        <Grid.Column width={14}>
          <Message info>
            *The complimentary team registration benefit has a $90 fair market value. If this benefit is accepted, the tax-deductible value of your donation will be reduced by $90, as required by the IRS.
          </Message>
        </Grid.Column>
      </Grid.Row>
    ];
  }
}
