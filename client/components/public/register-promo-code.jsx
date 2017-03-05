import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Header, Segment, Accordion, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router';

RegisterPromoCode = class RegisterPromoCode extends Component {
  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Promo Code Registration'/>
      </Container>
    );
  }
}
