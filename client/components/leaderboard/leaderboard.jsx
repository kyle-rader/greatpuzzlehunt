import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, {PropTypes} from 'react';
import { sortBy, groupBy, map, cloneDeep } from 'lodash';
import { Container, Grid, Icon, Header } from 'semantic-ui-react';
import moment from 'moment';
import { renderDuration } from '../imports/puzzle-progress';

const divisionMap = {
  'open': 'Open',
  'wwu-alumni': 'WWU Alumni',
  'wwu-student': 'WWU Student',
};

class LeaderboardInner extends React.Component {

  render() {
    const { ready } = this.props;
    let content = ready ? this._main() : <Loading/>;
    console.log(this.props.teams);
    return (
      <Container>
        <PuzzlePageTitle title='Leaderboards'/>
        { content }
      </Container>
    );
  }

  _main() {
    const divisions = groupBy(this.props.teams, 'division');
    return map(divisions, (teams, division) => this._leaderBoard(teams, division));
  }

  _leaderBoard(teams, division) {
    return (
      <Grid celled key={division}>
        <Grid.Row>
          <Grid.Column>
            <Header as='h3' content={ divisionMap[division] }/>
          </Grid.Column>
        </Grid.Row>
        { teams.map((t) => this._team(t)) }
      </Grid>
    );
  }

  _team(team) {

    const myTeam = this.props.user && this.props.user.teamId === team._id;
    const timeStyle = {
      fontFamily: 'monospace',
    };
    return (
      <Grid.Row columns='2' key={ team._id }>
        <Grid.Column>
          { myTeam ? <Icon name='users' color='blue'/> : null } { team.name } <br/>
          <Icon name={ team.finished ? 'check' : 'refresh' } color={ team.finished ? 'green' : 'orange'}/>
          <small>{ team.finished ? 'Finished' : 'In Progress'}</small>
          &nbsp; <Icon name='lightbulb' color='yellow'/> { team.hintsTaken }
        </Grid.Column>
        <Grid.Column style={ timeStyle }>
          { renderDuration(moment.duration({ seconds: team.finalScore })) } <br/> ({team.finalScore} sec)
        </Grid.Column>
      </Grid.Row>
    );
  }
}

LeaderboardInner.propTypes = {
  ready: PropTypes.bool.isRequired,
  teams: PropTypes.array,
  user: PropTypes.object,
};

import { scorePuzzle as scoreP } from '../../../lib/imports/puzzle-helpers';

function scorePuzzle(puzzle) {
  if (!puzzle.start && !puzzle.end) return 0;
  const hintsTaken = puzzle.hints.length > 0 ? puzzle.hints.filter((hint) => hint.taken).length : 0;
  return scoreP(puzzle.start, puzzle.end, hintsTaken, puzzle.bonusTime);
}

function hintsUsed(puzzle) {
  return puzzle.hints.length > 0 ? puzzle.hints.filter((hint) => hint.taken).length : 0;
}

function scoreTeam(team) {
  const solved = team.puzzles.filter((p) => (p.start && p.end)).length;
  const finished = solved === team.puzzles.length;
  const finalScore = team.puzzles.reduce((acc, p) => acc + scorePuzzle(p), 0);
  const hintsTaken = team.puzzles.reduce((acc, p) => acc + hintsUsed(p), 0);

  return {
    _id: team._id,
    name: team.name,
    members: team.members,
    division: team.division,
    finished,
    finalScore,
    hintsTaken,
  };
}

Leaderboard = createContainer(() => {
  const handle = Meteor.subscribe('leaderboard');
  const ready = handle.ready();
  const user = Meteor.user();

  const rawTeams = Teams.find({}).fetch();
  const teams = rawTeams.map((t) => scoreTeam(t));
  console.log(teams);

  return {
    ready,
    user,
    teams,
  };

}, LeaderboardInner);
