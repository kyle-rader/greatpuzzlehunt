import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

PuzzleAttempts = new Mongo.Collection("puzzleattempts");

let checkForVolunteer = function() {
    if(!Meteor.user())
        throw new Meteor.Error('400', 'You must be logged in!');
    else if (!Meteor.user().roles.indexOf('volunteer') > -1)
        throw new Meteor.Error('403', 'You must be a volunteer!');
};

Meteor.methods({
    startPuzzle: function(teamId, puzzleId) {
        // Check Args
        check(teamId, String);
        check(puzzleId, String);

        // Make Sure a volunteer is calling this function. 
        PuzzleAttempts.insert({
            teamId: teamId,
            puzzleId: puzzleId,
            startTime: new Date(),
            finishTime: null,
            hintsUsed: []
        });
    },

    getHint: function(teamId, puzzleId){
        var attempt = PuzzleAttempts.findOne({teamId:teamId, puzzleId:puzzleId});
        if(!attempt){
            return null;
        }
        var puzzle = Puzzles.findOne({id:puzzleId});
        var hint = puzzle.hints[attempt.hintsUsed];

        PuzzleAttempts.update({teamId:teamId, puzzleId:puzzleId}, {$set:{hintsUsed:attempt.hintsUsed + 1}});
        return hint;
    },

    submitAnwser(teamId, puzzleId, answer){
        var puzzle = Puzzles.findOne({_id:puzzleId});
        if(!puzzle){
            return null;
        }

        var found = false;
        for(var i in puzzle.hints){
            if(answer.toLowerCase() == i.toLowerCase()){
                found = true;
                break;
            }
        }
        if(!found){
            return false;
        }
        else{
            PuzzleAttempts.update({teamId:teamId, puzzleId:puzzleId}, {$set:{finishTime: new Date()}});
            return true;
        }
    },
});
