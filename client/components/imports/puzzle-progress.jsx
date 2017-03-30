import { Meteor } from 'meteor/meteor';
import React, {PropTypes} from 'react';
import { Grid, Progress } from 'semantic-ui-react';
import moment from 'moment';

function getColor(val) {
  const colors = ['green', 'olive', 'yellow', 'orange', 'red'];
  return colors[Math.floor(val/(100/colors.length))];
}

function pad(n, width, z = '0') {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
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

    const max = moment.duration(1, 'hours').asSeconds();
    const duration = moment.duration(now - start);
    const current = duration.asSeconds();
    const percent = 100 * Number((current/max).toFixed(2));
    // const timeLeft = moment.duration(1, 'hour').subtract(duration);
    const min = pad(duration.minutes(), 2);
    const sec = pad(duration.seconds(), 2);

    return (
      <Grid stackable>
        <Grid.Row columns='1'>
          <Grid.Column>
            <Progress
              size='small'
              color={ getColor(percent) }
              percent={ percent }>
              Time elapsed: { min }:{ sec } <br/>
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
