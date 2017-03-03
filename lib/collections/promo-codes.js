import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { requireAdmin, isAdmin, checkMinLength, requireUser, makeName } from '../imports/method-helpers.js';

PromoCodes = new Mongo.Collection('promo_codes');

Meteor.methods({

  'promo_codes.create'(name, code, units) {
    checkMinLength(name, 1);
    checkMinLength(code, 6);
    check(units, Integer);

    requireAdmin();

    if (!Meteor.isServer) return true;

    return PromoCodes.create({
      name,
      code,
      units,
      used: 0,
    });
  },

  'promo_codes.update'(id, name, code, units) {
    check(id, String);
    checkMinLength(name, 1);
    checkMinLength(code, 6);
    check(units, Integer);

    requireAdmin();

    if (!Meteor.isServer) return true;

    return PromoCodes.update(id, { $set: { name, code, units } });
  },

  'promo_codes.delete'(id) {
    check(id, String);

    requireAdmin();

    if (!Meteor.isServer) return true;

    return PromoCodes.remove(id);
  },

});
