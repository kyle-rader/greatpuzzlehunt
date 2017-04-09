import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, {PropTypes} from 'react';
import { sortBy, groupBy, map } from 'lodash';
import { Container, Grid, Icon, Header, List } from 'semantic-ui-react';

const divisionMap = {
  'open': 'Open',
  'wwu-alumni': 'WWU Alumni',
  'wwu-student': 'WWU Student',
};

export default class TeamsTraveled extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      teams: [],
    };

    Meteor.call('admin.teams.traveled', (error, teams) => {
      if (error) return alert(error.reason);
      this.setState({ teams });
    });
  }

  render() {
    const { teams } = this.state;
    let content = teams.length > 0 ? this._main() : <Loading/>;

    return (
      <Container>
        <Header as='h3' content="Team's Distance Traveled"/>
        { content }
      </Container>
    );
  }

  _main() {
    const teams = sortBy(this.state.teams, (t) => -t.totalTraveled);
    const divisions = groupBy(teams, 'division');
    return map(divisions, (teams, division) => this._teamGrid(teams, division));
  }

  _teamGrid(teams, division) {
    return (
      <Grid celled key={division}>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2' color='blue' content={ divisionMap[division] }/>
          </Grid.Column>
        </Grid.Row>
        { teams.map((t) => this._team(t)) }
      </Grid>
    );
  }

  _team(team) {
    const distanceStyle = {
      fontFamily: 'monospace',
    };

    return (
      <Grid.Row columns='2' key={ team._id }>
        <Grid.Column width='10'>
          <h3>{ team.name }</h3>
          { this._miniTeamList(team.users) }
        </Grid.Column>
        <Grid.Column width='6' style={ distanceStyle }>
          { team.totalTraveled.toFixed(2) } km
        </Grid.Column>
      </Grid.Row>
    );
  }

  _miniTeamList(users) {
    return (
      <Grid>
        { users.map((u) => (
            <Grid.Row columns='3' key={u._id}>
              <Grid.Column>{ u.name }</Grid.Column>
              <Grid.Column>{ u.city }</Grid.Column>
              <Grid.Column>{ u.state }</Grid.Column>
            </Grid.Row>
          ))
        }
      </Grid>
    );
  }
}

TeamsTraveled.propTypes = {};
