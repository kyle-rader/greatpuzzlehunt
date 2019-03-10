import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Scrollchor from 'react-scrollchor';
import { Grid, Container, Segment, Icon, Message, Button } from 'semantic-ui-react';
import moment from 'moment';

import LinkButton from '../../imports/LinkButton';
import TimedComp from './TimedComp';

const { eventDate, earlyBirdLastDate, registrationCloseDate } = Meteor.settings.public;

const registerNowMessage = (
  <Message icon color='teal'>
    <Icon name='ticket'/>
    <Message.Content>
      <Message.Header>Why Register Now?</Message.Header>
      All ticket and gear prices go up on {earlyBirdLastDate} at midnight!
    </Message.Content>
  </Message>
);

const registrationClosesMessage = (
  <Message icon color='yellow'>
    <Icon name='ticket'/>
    <Message.Content>
      <Message.Header>Why Register Now?</Message.Header>
      Step 1 of Registration Closes {registrationCloseDate}, 11:59 PM. <br/>
      You can still <a href="https://commerce.cashnet.com/TheGreatPuzzleHunt2019" target="_blank">buy and redeem tickets</a> until 10:00 AM {eventDate}.
    </Message.Content>
  </Message>
);

export default class HomeHeader extends Component {
  render() {
    return (
      <section className="pattern-bg" id="home-header">
        <Grid stackable>

          <Grid.Row className="header-wrap">
            <Grid.Column className="hide-on-mobile" width={9}>
              <img className="header-magnyfying-glass" src="/img/header-magnifying-glass.png"/>
            </Grid.Column>
            <Grid.Column verticalAlign="middle" width={6}>
              <Container>
                <h1 className="header-text text-highlight-color">Fourth Annual</h1>
                <h1 className="header-text gigantic">WWU</h1>
                <h1 className="header-text gigantic">Great</h1>
                <h1 className="header-text gigantic">Puzzle</h1>
                <h1 className="header-text gigantic">Hunt</h1>
              </Container>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row centered divided>
            <Grid.Column verticalAlign="middle" width={5}>
              <h2 className="sub-header-text">
                {eventDate} <br/> 10:00 AM
              </h2>
            </Grid.Column>
            <Grid.Column verticalAlign="middle" width={5}>
              <Segment basic size='large' className="no-padding">
                Western Washington University<br/>
                516 High Street<br/>
                Bellingham, WA 98225<br/>
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row centered>
            <Grid.Column width={16}>
              { this._linkButtons() }
            </Grid.Column>
          </Grid.Row>

          <Grid.Row centered>
            <Grid.Column width={16}>
              <h3>
                This event is made possible thanks to
                <Scrollchor
                  to="#sponsors"
                  animate={{offset:-60, duration:800}}><strong> our Awesome Sponsors</strong>
                </Scrollchor>!
              </h3>
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </section>
    );
  }

  _linkButtons() {
    return (
    <div>
      <LinkButton to='/register' size='huge' color='blue' content='Register Now!'/>
      <LinkButton to="/login" size='huge' content='Log In'/>
      <br /><br />

      <LinkButton as='a' href="https://www.wwu.edu/emarket/puzzlehunt/#design"
        size="large" color="blue" target="_blank"
        icon={<Icon name="shopping cart" />}
        content="Buy Gear"
        />
      <LinkButton to="/faq" size="large" content="FAQ" />
      <LinkButton as='a' href="https://alumni.wwu.edu/greatpuzzlehunt"
        size='large' color='green'
        icon={<Icon name='heart'/>}
        content='Donate'
      />
    </div>
    );
  }
}
