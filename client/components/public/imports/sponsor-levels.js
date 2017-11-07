import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Grid, Segment, Button, Icon, Image } from 'semantic-ui-react';
import LinkButton from '../../imports/link-button';
import SponsorTile from './sponsor-tile';

export default class SponsorLevels extends Component {
  render() {
    return (
      <Grid padded stackable className="filling">
        <Grid.Row>
          <Grid.Column>
            <Image src='/img/2016/event-photos/gathering-thin.jpg'/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column className='dark-blue'>
            <Segment basic>
              <h1>
                Invest in Your Community by Sponsoring The Hunt!
              </h1>
              <LinkButton as='a'
                href="https://alumni.wwu.edu/greatpuzzlehunt"
                size='large' color='violet' content='Donate Online'
                icon={<Icon name='heart'/>}
              />
              <h3>
                All donations are made through WWU and are tax deductible!
              </h3>
            <div className="item">
              <Button className="white button" as='a' target="_blank" href="http://foundation.wwu.edu/s/1710/campaign/index.aspx?sid=1710&gid=2&pgid=420">
                Donating by check?
              </Button>
            </div>
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column className='dark-blue'>
          <Segment basic>
            <h1>Sponsorship Levels</h1>
            <Grid doubling columns={4}>
              <Grid.Row>
                <SponsorTile name="JIGSAW" icon="puzzle" price="$200 - $499" description="Name/Logo on website sponsor list"/>
                <SponsorTile name="CROSSWORD" icon="crop" price="$500 - $999" description="All from JIGSAW + Name/Logo on t-shirt"/>
                <SponsorTile name="CIPHER" icon="code" price="$1000 - $1999" description="All from CROSSWORD + Complimentary registration for 6 person team"/>
                <SponsorTile name="PUZZLE MASTER" icon="trophy" price="$2000+" description="All from CIPHER + Name/Logo on all event materials, advertising, and press releases"/>
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    );
  }
}
