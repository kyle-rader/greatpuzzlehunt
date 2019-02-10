import { Meteor } from 'meteor/meteor';
import moment from 'moment';

const CHECK_INTERVAL = {
  seconds: 5,
};

function timeOutPuzzles() {
  const now = moment();
  const teams = Teams.find({
    division: { $ne: "noncompetitive" },
    currentPuzzle: { $ne: null },
  }).fetch();

  const puzzles = Puzzles.find({}).fetch().reduce((acc, p) => {
    acc[p._id] = p;
    return acc;
  }, {});

  teams.forEach((team) => {
    const i = team.puzzles.findIndex((p) => (p.puzzleId === team.currentPuzzle));
    const puzzle = team.puzzles[i];

    const allowedTime = { minutes: puzzle.allowedTime };
    const timeOutScore = moment.duration({ minutes: puzzle.timeoutScore }).asSeconds();

    const maxTime = moment(puzzle.start).add(allowedTime);

    if (now.isAfter(maxTime)) {
      // Timeout this puzzle
      Teams.update(team._id, {
        $set: {
          currentPuzzle: null,
          [`puzzles.${i}.end`]: maxTime.toDate(),
          [`puzzles.${i}.score`]: timeOutScore,
          [`puzzles.${i}.answer`]: puzzles[puzzle.puzzleId].answer,
          [`puzzles.${i}.timedOut`]: true,
        },
      });
    }
  });
}

Meteor.startup(() => {
  // On Startup, init Interval for puzzle timeout watcher.
  const interval = moment.duration(CHECK_INTERVAL).asMilliseconds();
  Meteor.setInterval(timeOutPuzzles, interval);
});
