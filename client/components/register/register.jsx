import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Header, Segment, Message, Accordion, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router';

import GamestateComp from '../imports/gamestate-comp';
import RegisterForm from './imports/register-form';

const { eventYear } = Meteor.settings.public;

class RegisterInner extends Component {
  render() {

    if (this.props.ready && !this.props.gamestate.registration) {
      return (
        <Container>
          <br/>
          <Message
            info large
            header='Registration is being updated...'
            content={`The ${eventYear} Great Puzzle Hunt registration will be back online ASAP!`}
          />
        </Container>
      );
    }

    return (
      <Container>
        <br/>
        <Segment basic>
          <RegisterForm/>
        </Segment>
      </Container>
    );
  }
}

Register = GamestateComp(RegisterInner);
