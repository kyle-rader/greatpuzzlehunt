import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, {PropTypes} from 'react';
import { sortBy, groupBy, map } from 'lodash';
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
    const finished = team.puzzles.every((p) => Boolean(p.score));
    const hintsTaken = team.puzzles.reduce((acc, p) => acc + p.hintsTaken, 0);
    const myTeam = this.props.user && this.props.user.teamId === team._id;
    const timeStyle = {
      fontFamily: 'monospace',
    };
    return (
      <Grid.Row columns='2' key={ team._id }>
        <Grid.Column>
          { myTeam ? <Icon name='users' color='blue'/> : null } { team.name } <br/>
          <Icon name={ finished ? 'check' : 'refresh' } color={ finished ? 'green' : 'orange'}/>
          <small>{finished ? 'Finished' : 'In Progress'}</small>
          &nbsp; <Icon name='lightbulb' color='yellow'/> { hintsTaken }
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

Leaderboard = createContainer(() => {
  const handle = Meteor.subscribe('leaderboard');
  const ready = handle.ready();
  const user = Meteor.user();
  const teams = sortBy(Teams.find({}).fetch(), 'finalScore');

  return {
    ready,
    user,
    teams,
  };

}, LeaderboardInner);
