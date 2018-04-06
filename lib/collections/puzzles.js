import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import { requireAdmin, isAdmin, checkMinLength } from '../imports/method-helpers.js';

Puzzles = new Mongo.Collection('puzzles');

Meteor.methods({
  'admin.puzzle.create'() {
    requireAdmin();
    if (!Meteor.isServer) return;

    return Puzzles.insert({
      name: 'New Puzzle',
      stage: 0,
      answer: '',
      allowedTime: 65,
      timeoutScore: 100,
      bonusTime: 15,
      location: '',
      hints: [
        {
          text: '',
          imageUrl: '',
        },
        {
          text: '',
          imageUrl: '',
        },
        {
          text: '',
          imageUrl: '',
        },
      ],
    });
  },

  'admin.puzzle.update'(puzzleId, fields) {
    check(puzzleId, String);
    check(fields, {
      name: String,
      stage: Number,
      answer: String,
      allowedTime: Number,
      timeoutScore: Number,
      bonusTime: Number,
      location: String,
      hints: [Object],
    });

    requireAdmin();
    if (!Meteor.isServer) return;

    // Make sure this puzzle exists.
    const puzzle = Puzzles.findOne(puzzleId);
    if (!puzzle) throw new Meteor.Error(400, `No puzzle with id ${puzzleId} was found!`);

    return Puzzles.update(puzzleId, {
      $set: fields,
    });
  },

  'admin.puzzle.delete'(puzzleId) {
    check(puzzleId, String);

    requireAdmin();
    if (!Meteor.isServer) return;

    // Make sure this puzzle exists.
    const puzzle = Puzzles.findOne(puzzleId);
    if (!puzzle) throw new Meteor.Error(400, `No puzzle with id ${fields._id} was found!`);

    // Remove puzzle
    return Puzzles.remove(puzzleId);
  }
});
