import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Progress, Message } from 'semantic-ui-react';
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
  const negative = (hours < 0) || (minutes < 0) || (seconds < 0) ? "- " : "";
  return `${negative}${pad(Math.abs(hours))}:${pad(Math.abs(minutes))}:${pad(Math.abs(seconds))}`;
}

export function renderScore(score) {
  const minutes = (score / 60.0).toFixed(2);
  return {
    time: renderDuration(moment.duration({ seconds: score })),
    minutes,
  };
}

export default class PuzzleProgress extends React.Component {
  constructor(props) {
    super(props);
    const hasEnded = Boolean(props.puzzle.end);

    this.state = {
      start: moment(props.puzzle.start),
      now: hasEnded ? moment(props.puzzle.end) : null,
      hasEnded,
    };

    if (!hasEnded) {
      this.interval = Meteor.setInterval(() => {
        const _this = this;
        Meteor.call('serverTime', (err, time) => {
          if (err) _this.setState({ now: moment() });
          else _this.setState({ now: moment(time) });
        })
      }, 1000);
    }
  }

  componentWillUnmount() {
    Meteor.clearInterval(this.interval);
  }

  render() {
    const { puzzle } = this.props;
    const { start, now, hasEnded } = this.state;

    if (!start) {
      return (
        <Message content="Unstarted"/>
      );
    }

    if (!now) {
      return (
        <Message content="Getting remaining time..." />
      );
    }

    const max = moment.duration({ minutes: puzzle.allowedTime }).asSeconds();
    const duration = moment.duration(now - start);
    const current = duration.asSeconds();
    const percent = 100 * Number((current/max).toFixed(2));

    return (
      <Segment basic>
        <Progress
          size='small'
          color={ getColor(percent) }
          percent={ percent }>
          {hasEnded ? "Final" : null} Solve Time: { renderDuration(duration) } <br/>
        </Progress>
      </Segment>
    );
  }
}

PuzzleProgress.propTypes = {
  puzzle: PropTypes.shape({
    start: PropTypes.object.isRequired,
    end: PropTypes.object,
    allowedTime: PropTypes.number.isRequired,
  }),
};
