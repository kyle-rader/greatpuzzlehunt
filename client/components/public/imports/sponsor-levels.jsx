import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Grid, Segment, Card, Header, Button, Icon, Image, Message } from 'semantic-ui-react';
import LinkButton from '../../imports/link-button';
import SponsorTile from './sponsor-tile';

export default class SponsorLevels extends Component {
  render() {
    return (
      <section className="pattern-bg" id="sponsorship-levels">
        <Grid centered textAlign="left" padded stackable style={{ padding: '10em 0em', margin:'0'}}>
          {this._donations()}
          {this._sponsors()}
          {this._thanks()}
        </Grid>
        <Image fluid src="/img/2016/event-photos/team-saxaphone-bugs-thin.jpg"/>
      </section>
    );
  }

  _donations() {
    return (
      <Grid.Row  verticalAlign='middle' >
        <Grid.Column width={6}>
          <Header as="h1" size="medium">
          Invest in Your Community by Sponsoring The Hunt!
          </Header>
          <Segment basic size='large' className="no-padding">
            <p>Donations of any amount will help support this Event.</p>
            <p>
              Please Consider:<br/>
              Sponsoring a student or team that needs help to participate <br/>
              Non monetary support such as prizes,or sign up as a volunteer<br/><br/>
              All donations are made through WWU and are tax deductible!<br/>
            </p>
          </Segment>
          <LinkButton as='a'
            href="https://alumni.wwu.edu/greatpuzzlehunt"
            size='large'  content='Donate Online'
            icon={<Icon name='heart'/>}
          />
          <LinkButton as='a'
            href="http://foundation.wwu.edu/s/1710/campaign/index.aspx?sid=1710&gid=2&pgid=420"
            size='large'  className="white button" content='Donating by check?'
            icon={<Icon name='heart'/>}
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <Image fluid src='/img/2016/event-photos/gathering.jpg'/>
        </Grid.Column>
      </Grid.Row>
    );
  }

  _sponsors() {
    return (
      <Grid.Row>
        <Grid.Column width={14}>
          <Header as="h1" size="huge"> Sponsorship Levels</Header>
          <Grid doubling columns={4}>
            <Grid.Row textAlign="left">
              <Grid.Column >
                <SponsorTile title="Puzzle Master" rank={4} name="PUZZLE MASTER*" icon="trophy" price="$2000+" description="All from CIPHER + Name/Logo on all event materials, advertising, and press releases"/>
              </Grid.Column>
              <Grid.Column>
                <SponsorTile title="Cipher" rank={3} name="CIPHER*" icon="code" price="$1000 - $1999" description="All from CROSSWORD + Complimentary registration for 6 person team"/>
              </Grid.Column>
              <Grid.Column>
                <SponsorTile title="Crossword" rank={2} name="CROSSWORD" icon="crop" price="$500 - $999" description="All from JIGSAW + Name/Logo on t-shirt"/>
              </Grid.Column>
              <Grid.Column>
                <SponsorTile title="Jigsaw" rank={1} name="JIGSAW" icon="puzzle" price="$200 - $499" description="Name/Logo on website sponsor list"/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    );
  }

  _thanks() {
    return [
      <Grid.Row key='sponsor-thanks-1'>
        <Grid.Column width={8}>
          <Message>
          Special thanks to Market Street Catering of <a href="http://www.haggen.com/" target="_blank" >Haggen NW Fresh </a> for providing fresh fruit and breakfast pastries including a  GF option and Woods Coffee for the brew!
          </Message>
        </Grid.Column>
      </Grid.Row>,
      <Grid.Row key='sponsor-thanks-2'>
        <Grid.Column width={8}>
          <Message>
          *The complimentary team registration benefit has a $90 fair market value. If this benefit is accepted, the tax-deductible value of your donation will be reduced by $90, as required by the IRS.
          </Message>
        </Grid.Column>
      </Grid.Row>
    ];
  }
}
