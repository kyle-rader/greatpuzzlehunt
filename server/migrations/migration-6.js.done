import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

  if (Migrations.find({migration: '6'}).count() === 0) {

    console.log("Performing Migration 6 - Adding Puzzle Name to Puzzle Attempts.");

    let puzzles = PuzzleCollection.find({}).fetch();
    let puzzleObj = {};
    for (let i = 0; i < puzzles.length; i++) {
      puzzleObj[puzzles[i]._id] = puzzles[i].name;
    }

    let attempts = PuzzleAttempts.find({}).fetch();

    /* Iterate through each team */
    _.each(attempts, (attempt) => {
      attempt.puzzleName = puzzleObj[attempt.puzzleId];

      PuzzleAttempts.update({_id: attempt._id}, attempt);
    });

    console.log(`Migration Done.`);

    Migrations.insert({migration: '6'});
  }

});
