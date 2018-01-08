import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

import { requireAdmin, isAdmin, NonEmptyString, requireUser, makeName } from '../imports/method-helpers.js';

// Emulate a user as if they came from CashNet registration.
function makeUser(data) {
  return {
    address: data.address,
    city: data.city,
    state: data.state,
    zip: data.zip,
    age: data.age,
    email: data.email,
    name: [data.firstname, data.lastname].join(' '),
    username: [data.firstname, data.lastname, '=='].join('_'),
    firstname: data.firstname,
    lastname: data.lastname,
    phone: data.phone,
    isAdult: data.age >= 18,
    registrationType: 'promo',
    photoPermission: data.photoPermission,
    emergencyContact: {
      name: data.ecName,
      relation: data.ecRelation,
      phone: data.ecPhone,
      altPhone: data.ecAltPhone,
      email: '',
    },
    transactionId: data.promocode.trim().toLowerCase(),
    updatedAt: new Date(),
    roles: ['user'],
  };
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

});
