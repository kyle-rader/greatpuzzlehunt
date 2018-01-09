import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Header, Segment, Message, Accordion, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router';

import GamestateComp from '../imports/gamestate-comp';
import RegisterForm from './imports/register-form';

class RegisterInner extends Component {
  render() {

    if (this.props.ready && !this.props.gamestate.registration) {
      return (
        <Container>
          <br/>
          <Message
            info
            header='Registration will open Jan 9, 2018'
            content='The 2018 Great Puzzle Hunt is under development!'
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
