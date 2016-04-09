Meteor.publish('leaderboard', function(argument) {
  return PuzzleAttempts.find({}, {teamId: 1, puzzleId: 1, startTime: 1, finishTime: 1});
});

Meteor.publish('team.puzzleAttempts', function() {
    if (!this.userId) return [];

    let team = Teams.findOne({members: this.userId});
    if (!team) return [];

    return PuzzleAttempts.find({teamId: team._id});
});

Meteor.publish('allPuzzleAttempts', function() {
    if (!this.userId) return [];

    let user = Meteor.users.findOne(this.userId);

    if (user.roles.indexOf('admin') > -1) {
        return PuzzleAttempts.find({});
    }
});
