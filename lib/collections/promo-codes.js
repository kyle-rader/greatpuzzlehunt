import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { requireAdmin, isAdmin, checkMinLength, requireUser, makeName } from '../imports/method-helpers.js';

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
    const { name, code, units } = data;

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
