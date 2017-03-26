import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import { requireAdmin, isAdmin, checkMinLength } from '../imports/method-helpers.js';

Puzzles = new Mongo.Collection('puzzles');

/*
 * Structure of a Puzzle
{
  name: String,
  stage: Number,
  answer: String,
  location: String,
  hints: [{
    description: String,
    image: {
      id: String,
      url: String,
    }
  }]
}
*/

Meteor.methods({
  'admin.puzzle.create'() {
    requireAdmin();
    if (!Meteor.isServer) return;

    return Puzzles.insert({
      name: 'New Puzzle',
      stage: 0,
      answer: '',
      location: '',
      hints: [],
    });
  },

  'admin.puzzle.update'(puzzleId, fields) {
    check(puzzleId, String);
    check(fields, {
      name: String,
      stage: Number,
      answer: String,
      location: String,
      hints: [Object],
    });

    requireAdmin();
    if (!Meteor.isServer) return;

    // Make sure this puzzle exists.
    const puzzle = Puzzles.findOne(puzzleId);
    if (!puzzle) throw new Meteor.Error(400, `No puzzle with id ${puzzleId} was found!`);

    return Puzzles.update(puzzleId, {
      $set: fields
    });
  },

  'admin.puzzle.delete'(puzzleId) {
    check(puzzleId, String);

    requireAdmin();
    if (!Meteor.isServer) return;

    // Make sure this puzzle exists.
    const puzzle = Puzzles.findOne(puzzleId);
    if (!puzzle) throw new Meteor.Error(400, `No puzzle with id ${fields._id} was found!`);

    // Remove Image hint for this puzzle.
    const imageIds = puzzle.hints.map((puzzle) => puzzle.image.id);
    Images.remove({ _id: imageIds });

    // Remove puzzle
    return Puzzles.remove(puzzleId);
  }
});
