import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

import { requireAdmin, isAdmin, NonEmptyString, requireUser, makeName } from '../imports/method-helpers.js';
const OptionalString = Match.Maybe(String);
const BooleanTrue = Match.Where((x) => {
  check(x, Boolean);
  return x === true;
});

function getPromoRegistrationError(ex) {
  switch (ex.path) {
    case 'firstname':
      return new Meteor.Error(400, 'Please enter your First Name.');
    case 'lastname':
      return new Meteor.Error(400, 'Please enter your Last Name.');
    case 'email':
      return new Meteor.Error(400, 'Please enter your email.');
    case 'promocode':
      return new Meteor.Error(400, 'Please enter a Promo Code.');
    case 'age':
      return new Meteor.Error(400, 'Please enter your Age as a number.');
    case 'phone':
      return new Meteor.Error(400, 'Please enter your Phone Number.');
    case 'address':
      return new Meteor.Error(400, 'Please enter your Address.');
    case 'zip':
      return new Meteor.Error(400, 'Please enter your Zip code.');
    case 'city':
      return new Meteor.Error(400, 'Please enter your City.');
    case 'state':
      return new Meteor.Error(400, 'Please enter your State.');
    case 'holdHarmless':
      return new Meteor.Error(400, 'You must accept the Hold Harmless Agreement above.');
    default:
      return ex;
  }
}

PromoCodes = new Mongo.Collection('promo_codes');

Meteor.methods({

  'promo_codes.create'() {
    requireAdmin();

    if (!Meteor.isServer) return true;

    return PromoCodes.insert({
      name: 'New Promo Code',
      code: '',
      units: 6,
      used: 0,
      createdAt: new Date(),
    });
  },

  'promo_codes.update'(id, data) {
    try {
      check(id, String);
      check(data, {
        name: String,
        code: String,
        units: Number,
      });
    } catch (ex) {
      throw new Meteor.Error(400, ex.message);
    }

    requireAdmin();
    const { name, units } = data;

    if (!Meteor.isServer) return true;

    return PromoCodes.update(id, { $set: {
      name,
      code: data.code.trim().toLowerCase(),
      units
    }});
  },

  'promo_codes.delete'(id) {
    check(id, String);

    requireAdmin();

    if (!Meteor.isServer) return true;

    return PromoCodes.remove(id);
  },

  'promo_codes.register'(data) {
    try {
      check(data, {
        firstname: NonEmptyString,
        lastname: NonEmptyString,
        email: NonEmptyString,
        promocode: NonEmptyString,
        age: Match.Integer,
        phone: NonEmptyString,
        address: NonEmptyString,
        zip: NonEmptyString,
        city: NonEmptyString,
        state: NonEmptyString,
        ecName: OptionalString,
        ecRelation: OptionalString,
        ecPhone: OptionalString,
        ecAltPhone: OptionalString,
        photoPermission: Boolean,
        holdHarmless: BooleanTrue,
      });
    } catch(ex) {
      throw getPromoRegistrationError(ex);
    }
  }

});
