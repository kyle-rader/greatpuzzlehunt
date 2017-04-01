import { Meteor } from 'meteor/meteor';
import moment from 'moment';

const CHECK_INTERVAL = {
  seconds: 10,
};

function timeOutPuzzles() {
  const teams = Teams.find({
    puzzles: {
      $elemMatch: {
        start: { $ne: null },
        end: null,
      },
    },
  }).fetch();

  const puzzles = Puzzles.find({}).fetch().reduce((acc, p) => {
    acc[p._id] = p;
    return acc;
  }, {});

  const now = moment();

  teams.forEach((team) => {
    const i = team.puzzles.findIndex((p) => (p.start && !p.end));
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
        $inc: {
          finalScore: timeOutScore,
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
