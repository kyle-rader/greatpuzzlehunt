import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, {PropTypes} from 'react';
import { sortBy, groupBy, map, clone, each } from 'lodash';
import { Container, Grid, Icon, Header, Progress } from 'semantic-ui-react';
import moment from 'moment';
import { renderDuration } from '../imports/PuzzleProgress';

class GameProgressInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._stateFromProps(props);
  }

  componentWillReceiveProps(props) {
    this.setState(this._stateFromProps(props));
  }

  _stateFromProps(props) {
    if (!props.ready || props.puzzles.length < 1) return { puzzles: [] };

    const puzzles = props.puzzles.reduce((acc, p) => {
      acc[p._id] = p;
      acc[p._id].started = 0;
      return acc;
    }, {});

    props.teams.forEach((team) => {
      team.puzzles.forEach((p) => {
        if (p.start) {
          puzzles[p.puzzleId].started = puzzles[p.puzzleId].started + 1;
        }
      });
    });
    return {
      puzzles,
    };
  }

  render() {
    const { ready } = this.props;
    let content = ready ? this._main() : <Loading/>;

    return (
      <Container>
        <PuzzlePageTitle title='Game Progress'/>
        { content }
      </Container>
    );
  }

  _main() {
    return map(this.state.puzzles, (puzzle, id) => this._puzzleState(puzzle, id));
  }

  _puzzleState(puzzle, id) {
    const numTeams = this.props.teams.length;
    const percent = 100 * (puzzle.started / numTeams);
    return (
      <Grid celled key={id}>
        <Grid.Row>
          <Grid.Column>
            <Header as='h3' content={ puzzle.name }/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Progress percent={ percent } autoSuccess>
              {puzzle.started} of {numTeams} started
            </Progress>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

GameProgressInner.propTypes = {
  ready: PropTypes.bool.isRequired,
  teams: PropTypes.array,
  puzzles: PropTypes.array,
  user: PropTypes.object,
};

GameProgress = withTracker(() => {
  const handle = Meteor.subscribe('game.progress');
  const ready = handle.ready();
  const user = Meteor.user();
  const teams = sortBy(Teams.find({}).fetch(), 'finalScore');
  const puzzles = Puzzles.find({}).fetch();

  return {
    ready,
    user,
    teams,
    puzzles,
  };

})(GameProgressInner);
