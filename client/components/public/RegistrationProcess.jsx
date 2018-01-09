import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Message, List, Icon, Header } from 'semantic-ui-react';

const { eventYear, siteName, siteURL } = Meteor.settings.public;

RegistrationProcess = class RegistrationProcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <Message info>
        <Message.Content>
          <Header as='h3'>{`Registration for the ${eventYear} ${siteName} is a 3-step process:`}</Header>
          {this._registrationList()}

          <Header as='h3'>Important Registration Information:</Header>
          <List bulleted relaxed>
            <List.Item>
              Participants are welcome to purchase extra ticket codes for others to redeem.
              <List bulleted>
                <List.Item>Anyone who gains access to a ticket code may redeem it.</List.Item>
                <List.Item>Each ticket code may be used only once.</List.Item>
              </List>
            </List.Item>
            <List.Item>Each participant must redeem a ticket code to complete their registration.</List.Item>
            <List.Item>Each member of a team must complete their registration for the team to participate.</List.Item>
          </List>
          <p>If you have any questions please email <a href="mailto:support@greatpuzzlehunt.com">support@greatpuzzlehunt.com</a></p>
        </Message.Content>
      </Message>
    );
  }

  _registrationList() {
    const { currentStep } = this.props;
    return (
      <List ordered relaxed>
        <List.Item>
          {currentStep === 0 ? this._youAreHere() : null }
          Create an account at <a target="blank" href={`${siteURL}/register`}>{`${siteURL}/register`}</a>.<br/>
          Deadline: <strong>11:59 PM April 12, 2018</strong>
        </List.Item>
        <List.Item>
          {currentStep === 1 ? this._youAreHere() : null }
          Purchase ticket code at <a target="_blank" href="https://commerce.cashnet.com/TheGreatPuzzleHunt2018">https://commerce.cashnet.com/TheGreatPuzzleHunt2018</a>.<br/>
          Deadline: <strong>10:00 AM April, 14 2018</strong>
        </List.Item>
        <List.Item>
          {currentStep === 3 ? this._youAreHere() : null }
          Redeem ticket code at <a target="blank" href={`${siteURL}/redeem`}>{`${siteURL}/redeem`}</a>.<br/>
          Deadline: <strong> 10:00 AM April 14, 2018</strong>
        </List.Item>
      </List>
    );
  }

  _youAreHere() {
    return (<strong>You are on this step.<br/></strong>);
  }

};
