import moment from 'moment';

export function scorePuzzle(start, end, hintsTaken) {
  const s = moment(start);
  const e = moment(end);
  const baseTime = moment.duration(e - s);

  // Hint Penalty
  baseTime.add(10 * hintsTaken, 'minutes');

  // bonus time
  if (hintsTaken == 0) baseTime.subtract(15, 'minutes');

  return baseTime.asSeconds();
}
