import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Grid, Container, Input, Menu, Icon, Label } from 'semantic-ui-react';

PromoCodesEditor = class PromoCodesEditor extends Component {

  componentWillUnmount() {
    Meteor.clearInterval(this.userCountInterval);
  }

  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Promo Codes'/>
        
      </Container>
    );
  }

}
