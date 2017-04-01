import moment from 'moment';

export function scorePuzzle(start, end, hintsTaken = 0, bonusTime = 0, allowedTime) {
  const s = moment(start);
  const e = moment(end);
  const baseTime = moment.duration(e - s);

  if (baseTime.asSeconds() >= moment.duration({ minutes: allowedTime }).asSeconds()) {
    return 7200;
  }

  // Hint Penalty
  baseTime.add({ minutes: 10 * hintsTaken });

  // bonus time
  if (hintsTaken === 0) {
    baseTime.subtract({ minutes: bonusTime });
  }

  return parseInt(baseTime.asSeconds());
}
