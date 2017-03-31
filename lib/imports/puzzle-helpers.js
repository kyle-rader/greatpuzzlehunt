import moment from 'moment';

export function scorePuzzle(start, end, hintsTaken) {
  const s = moment(start);
  const e = moment(end);
  const baseTime = moment.duration(e - s);

  // Hint Penalty
  baseTime.add({ minutes: 10 * hintsTaken });

  // bonus time
  if (hintsTaken === 0) {
    baseTime.subtract({ minutes: 15 });
  }

  return baseTime.asSeconds();
}
