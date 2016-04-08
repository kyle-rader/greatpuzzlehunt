Meteor.publish("leaderboard", function(argument){
  return PuzzleAttempts.find({});
});
