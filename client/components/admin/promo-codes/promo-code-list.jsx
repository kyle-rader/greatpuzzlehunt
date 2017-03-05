import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Container, Item, Button } from 'semantic-ui-react';

import PromoCodeForm from './promo-code-form.jsx';

PromoCodesList = class PromoCodesList extends Component {

  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Promo Codes'/>
        <Button content='Create new Promo Code' color='blue' onClick={ (e) => this._createNewCode(e) }/>
        <Item.Group>
          { this._promoCodes() }
        </Item.Group>
      </Container>
    );
  }

  _createNewCode(e) {
    e.preventDefault();
    Meteor.call('promo_codes.create');
  }

  _promoCodes() {
    if (!this.props.ready) return null;
    return this.props.promo_codes.map((code) => this._promoCodeItem(code));
  }

  _promoCodeItem(promoCode) {
    return (
      <Item key={ promoCode._id }>
        <PromoCodeForm promoCode={ promoCode }/>
      </Item>
    );
  }

};

PromoCodesList = createContainer(() => {
  const handle = Meteor.subscribe('promo_codes');
  const ready = handle.ready();
  const promo_codes = PromoCodes.find({}).fetch();

  return {
    ready,
    promo_codes,
  };
}, PromoCodesList);
