import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { extend } from 'lodash';
import { requireAdmin, isAdmin, checkMinLength } from '../imports/method-helpers.js';

Sponsors = new Mongo.Collection('sponsors');

Meteor.methods({
  'sponsors.create'() {
    requireAdmin();
    const now = new Date();
    Sponsors.insert({
      name: "New Sponsor",
      amount: 0,
      publish: false,
      logoUrl: null,
      imageId: null,
      createdAt: now,
      updatedAt: now,
    });
  },

  'sponsors.update'(fields) {
    // check(fields, {
    //   _id: String,
    //
    // })
  },

  'sponsors.updateImage'(ids) {
    check(ids, {
      sponsorId: String,
      imageId: String,
    });
    // TODO: ADD Logging Statement.
    const { sponsorId, imageId } = ids;
    const image = Images.findOne({_id: imageId});
    const url = image.url();

    Sponsors.update({ _id: sponsorId}, { $set: {
      imageId: imageId,
      logoUrl: url,
    }});
  },

  'sponsors.remove'(id) {
    check(id, String);
    requireAdmin();
    const sponsor = Sponsors.findOne({ _id: id });
    Images.remove({_id: sponsor.imageId});
    Sponsors.remove({_id: id});
  },
});
