import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

  if (Migrations.find({migration: '7'}).count() === 0) {

    console.log("Performing Migration 7 - Removing Image ID's from puzzles");

    PuzzleCollection.update({},
                            {$set: {hints: []}},
                            {multi: true});

    Migrations.insert({migration: '7'});
  }

});
