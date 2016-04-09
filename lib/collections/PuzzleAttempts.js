import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

PuzzleAttempts = new Mongo.Collection("puzzleattempts");

let checkForVolunteer = function() {
    if(!Meteor.user())
        throw new Meteor.Error('400', 'You must be logged in!');
    else if (Meteor.user().roles.indexOf('volunteer') < 0)
        throw new Meteor.Error('403', 'You must be a volunteer!');
};

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

        // Okay, this Team "fields.teamId" is going to start solving Puzzle "fields.puzzleId"

        PuzzleAttempts.insert({
            teamId: fields.teamId,
            puzzleId: fields.puzzleId,
            startTime: new Date(),
            finishTime: null,
            hintsUsed: []
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

    submitAnwser(teamId, puzzleId, answer) {
        var puzzle = Puzzles.findOne({_id:puzzleId});
        if(!puzzle) {
            return null;
        }

        var found = false;
        for(var i in puzzle.hints) {
            if(answer.toLowerCase() == i.toLowerCase()){
                found = true;
                break;
            }
        }
        if(!found) {
            return false;
        }
        else {
            PuzzleAttempts.update({teamId:teamId, puzzleId:puzzleId}, {$set:{finishTime: new Date()}});
            return true;
        }
    },
});
