// Meteor.publish('attemptsLeaderboard', function(teamId) {
//     check(teamId, String);

//     return PuzzleAttempts.find({teamId: teamId}, {puzzleId: 1, startTime: 1, finishTime: 1, finalScore: 1, hintCount: 1, puzzleName: 1});
// });

// Meteor.publish('team.puzzleAttempts', function() {
//     if (!this.userId) return [];

//     let team = Teams.findOne({members: this.userId});
//     if (!team) return [];

//     return PuzzleAttempts.find({teamId: team._id});
// });
