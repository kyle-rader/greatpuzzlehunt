Meteor.publish('leaderboard', function(argument) {
  return PuzzleAttempts.find({}, {teamId: 1, puzzleId: 1, startTime: 1, finishTime: 1});
});

Meteor.publish('team.puzzleAttempts', () => {
    if (!this.userId) return [];

    let team = Teams.findOne({members: this.userId});
    if (!team) return [];

    return PuzzleAttempts.find({teamId: team._id});
});
