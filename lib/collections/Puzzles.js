import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

PuzzleCollection = new Mongo.Collection('puzzles');

function checkForAdmin() {
    if (!Meteor.userId) {
        throw new Meteor.Error(403, 'You must be logged in');
    }
    else if (Meteor.user().roles.indexOf('admin') < 0) {
        throw new Meteor.Error(403, 'You do not have permission to do that!');
    }
};

Meteor.methods({
    createPuzzle() {
        checkForAdmin();

        if (!Meteor.isServer)
            return;

        let newPuzzleId = PuzzleCollection.insert({
            name: 'New Puzzle',
            order: 0,
            answer: '',
            badAnswer: '',
            badAnswerResponse: '',
            location: '',
            hints: []
        }, (err) => {
            if (err) {
                throw new Meteor.Error(err.reason);
            }
        });

        return newPuzzleId;
    },

    updatePuzzle(fields) {
        check(fields, {
            _id: String,
            name: String,
            order: Number,
            answer: String,
            badAnswer: String,
            badAnswerResponse: String,
            location: String,
            hints: [String]
        });

        checkForAdmin();

        if (!Meteor.isServer)
            return;

        // Make sure this puzzle exists.
        let puzzle = PuzzleCollection.findOne({_id: fields._id});
        if (!puzzle) throw new Meteor.Error(400, `No puzzle with id ${fields._id} was found!`);

        PuzzleCollection.update({_id: puzzle._id}, { $set: fields }, (err) => {
            if (err) {
                throw new Meteor.Error(400, 'Error updating puzzle');
            } else {
                return puzzle._id;
            }
        });
    },

    deletePuzzle(fields) {
        check(fields, {
            _id: String
        });

        checkForAdmin();

        if (!Meteor.isServer)
            return;

        // Make sure this puzzle exists.
        let puzzle = PuzzleCollection.findOne({_id: fields._id});
        if (!puzzle) throw new Meteor.Error(400, `No puzzle with id ${fields._id} was found!`);

        // Remove Image hint for this puzzle.
        Images.remove({_id: {$in: puzzle.hints }});

        // Remove puzzle
        PuzzleCollection.remove({_id: puzzle._id});
    }
});
