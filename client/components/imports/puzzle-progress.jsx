import { Meteor } from 'meteor/meteor';
import React, {PropTypes} from 'react';
import { Grid, Progress } from 'semantic-ui-react';
import moment from 'moment';

function getColor(val) {
  const colors = ['green', 'olive', 'yellow', 'orange', 'red'];
  const colorKey = Math.floor(val/(100/(colors.length-1)));
  return colors[colorKey];
}

export function pad(n) {
  n = n.toString();
  return n.length > 1 ? n : `0${n}`;
}

export function renderDuration(duration) {
  const hours = pad(duration.hours().toString(), 2);
  const minutes = pad(duration.minutes().toString(), 2);
  const seconds = pad(duration.seconds().toString(), 2);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export default class PuzzleProgress extends React.Component {
  constructor(props) {
    super(props);
    const hasEnded = Boolean(props.puzzle.end);

    this.state = {
      start: moment(props.puzzle.start),
      now: hasEnded ? moment(props.puzzle.end) : moment(),
    };

    if (!hasEnded) {
      this.interval = Meteor.setInterval(() => this.setState({
        now: moment(),
      }), 1000);
    }
  }

  componentWillUnmount() {
    Meteor.clearInterval(this.interval);
  }

  render() {
    const { puzzle } = this.props;
    const { start, now } = this.state;

    const max = moment.duration({ minutes: puzzle.allowedTime }).asSeconds();
    const duration = moment.duration(now - start);
    const current = duration.asSeconds();
    const percent = 100 * Number((current/max).toFixed(2));
    // const timeLeft = moment.duration(1, 'hour').subtract(duration);

    return (
      <Grid stackable>
        <Grid.Row columns='1'>
          <Grid.Column>
            <Progress
              size='small'
              color={ getColor(percent) }
              percent={ percent }>
              Time elapsed: { renderDuration(duration) } <br/>
            </Progress>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

PuzzleProgress.propTypes = {
  puzzle: PropTypes.object.isRequired,
};
