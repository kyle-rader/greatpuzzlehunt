import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

PuzzleAttempts = new Mongo.Collection("puzzleattempts");

let checkForVolunteer = function() {
    if(!Meteor.user())
        throw new Meteor.Error('400', 'You must be logged in!');
    else if (Meteor.user().roles.indexOf('volunteer') < 0)
        throw new Meteor.Error('403', 'You must be a volunteer!');
};

const ONE_SEC = 1000;
const ONE_MIN = 1000 * 60;
const TEN_MIN = ONE_MIN * 10;
const FIFTEEN_MIN = 900000;
const ONE_HOUR = 3600000;

Meteor.methods({

    startPuzzle: function(fields) {
        // Check Args
        check(fields, {
            teamId: String,
            puzzleId: String
        });

        // Make Sure a volunteer is calling this function.
        checkForVolunteer();

        // Is this a valid team?
        let team = Teams.findOne({_id: fields.teamId});
        if (!team) {
            throw new Meteor.Error(400, `No team found with _id:${fields.teamId}`);
        }

        // Is this team allowed to start a puzzle right now? (Do they already have an outstanding PuzzleAttempt?)
        let existingAttempts = PuzzleAttempts.find({teamId: fields.teamId, finishTime: null}).fetch();
        if (existingAttempts.length > 0) {
            throw new Meteor.Error(400, `This team is already solving a puzzle!`);
        }

        // Have they already solved this puzzle?
        let duplicateAttempt = PuzzleAttempts.findOne({teamId: fields.teamId, puzzleId: fields.puzzleId});
        if (duplicateAttempt) {
            throw new Meteor.Error(400, 'This team has already solved this puzzle!');
        }

        // Okay, this Team "fields.teamId" is going to start solving Puzzle "fields.puzzleId"

        let attemptId = PuzzleAttempts.insert({
            teamId: fields.teamId,
            puzzleId: fields.puzzleId,
            startTime: new Date(),
            finishTime: null,
            finalScore: null,
            hints: []
        });
    },

    getHint: function(teamId, puzzleId) {
        var attempt = PuzzleAttempts.findOne({teamId:teamId, puzzleId:puzzleId});
        if(!attempt) {
            return null;
        }
        var puzzle = Puzzles.findOne({id:puzzleId});
        var hint = puzzle.hints[attempt.hintsUsed];

        PuzzleAttempts.update({teamId:teamId, puzzleId:puzzleId}, {$set:{hintsUsed:attempt.hintsUsed + 1}});
        return hint;
    },

    submitAnswer(fields) {
        check(fields, {
            teamId: String,
            puzzleId: String,
            answer: String
        });

        if (!Meteor.isServer) return;

        if (!Meteor.user()) { throw new Meteor.Error(400, 'You must be logged in!'); }

        let team = Teams.findOne({_id: fields.teamId});
        if (!team) throw new Meteor.Error(400, 'Bad team Id');

        let puzzle = PuzzleCollection.findOne({_id:fields.puzzleId});
        if (!puzzle) {
            throw new Meteor.Error(400, `Ivalid puzzle id provided ${fields.puzzleId}`);
        }

        // Check Answer
        let guess = fields.answer.replace(/\s+/g,'').toLowerCase();
        if (guess === puzzle.answer) {
            let end = new Date();
            let puzzleAttempt = PuzzleAttempts.findOne({teamId:fields.teamId, puzzleId:fields.puzzleId});
            let final = (end - puzzleAttempt.startTime) + (TEN_MIN * puzzleAttempt.hints.length) - FIFTEEN_MIN;
            PuzzleAttempts.update({teamId:fields.teamId, puzzleId:fields.puzzleId}, {
                $set: {finishTime: end, finalScore: final}
            });
        }
        // TODO: Check bad answer
    },
});


