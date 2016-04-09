
Meteor.startup(() => {

    if (!Meteor.isServer)
        return;

    const ONE_HOUR = 3600000;
    const ONE_SEC = 1000;

    // Check every 15 seconds.
    Meteor.setInterval(() => {

        let gameState = GameState.findOne({});
        if (!gameState.gameplay)
            return; // Game not one - don't check for puzzles.

        console.log('Checking For Timed Out Puzzles');
        // Game ON Check For Puzzles out of time
        let attempts = PuzzleAttempts.find({finishTime: null}).fetch();

        for (let i = 0; i < attempts.length; i++) {
            // Is this Puzzle Attempt out of time?
            let attempt = attempts[i];
            if (Date.now() - attempt.startTime.getTime() >= ONE_HOUR) {
                PuzzleAttempts.update({_id: attempt._id}, {$set: {
                    finishTime: new Date(),
                    finalScore: (2 * ONE_HOUR)
                }});
            }
        }
    }, ONE_SEC * 15);
});
