import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Grid, Segment, Header, Icon, Image } from 'semantic-ui-react';
import LinkButton from '../../imports/link-button';

export default class HomeDonate extends Component {
  render() {
    return (
      <section className="pattern-bg" id="donate-message">

        <Grid centered textAlign="left" padded stackable style={{ padding: '2em 0em', margin:'0'}}>
          <Grid.Row verticalAlign='middle' width={14}>

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
                href="https://foundation.wwu.edu/making-gift"
                size='large'  className="white button" content='Donating by check?'
                icon={<Icon name='heart'/>}
              />
            </Grid.Column>

            <Grid.Column width={8}>
              <Image fluid src='/img/2016/event-photos/gathering.jpg'/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </section>
    );
  }
}
