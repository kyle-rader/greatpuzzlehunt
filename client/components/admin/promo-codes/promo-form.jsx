import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Form, Input, Icon, Header  } from 'semantic-ui-react';

PromoCodesEditor = class PromoCodesEditor extends Component {

  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Promo Codes'/>
        <PromoCodeForm promoCode={ {
          _id: '123kjbl1b3fl2b',
          name: 'test promo',
          code: 'THECODE',
          units: 3,
          used: 2,
        }}/>
      </Container>
    );
  }

};
