import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { groupBy, every, sortBy } from 'lodash';

import {
  Segment,
  Header,
  Table,
  Icon,
} from 'semantic-ui-react';

import { renderScore } from '../../../imports/PuzzleProgress';

class AdminLeaderboardDivisionTable extends Component {
  render() {
    const { division, teams } = this.props;
    const sortedTeams = sortBy(teams, ['finalScore']);

    return (
      <Segment basic>
        <Header as="h3" content={`Division: ${division}`}/>
        {sortedTeams.length > 0 ? this._renderTable(sortedTeams) : this._noTeams()}
      </Segment>
    );
  }

  _noTeams() {
    return <Message info header="No Teams" content="No teams in this division have started playing"/>;
  }

  _renderTable(teams) {
    const puzzleNames = teams[0].puzzles.map((p) => p.name);
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Team</Table.HeaderCell>
            <Table.HeaderCell>Size</Table.HeaderCell>
            <Table.HeaderCell>Score</Table.HeaderCell>
            {puzzleNames.map((name) => <Table.HeaderCell key={name}>{name}</Table.HeaderCell>)}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {teams.map((team) => this._renderTeamRow(team))}
        </Table.Body>
      </Table>
    );
  }

  _renderTeamRow(team) {
    const { _id: teamId, name, members, puzzles, finalScore } = team;
    const finished = every(puzzles, (puzzle) => Boolean(puzzle.end));
    return (
      <Table.Row key={teamId}>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{members.length}</Table.Cell>
        <Table.Cell positive={finished} negative={!finished}>{renderScore(team.finalScore).time}</Table.Cell>
        {puzzles.map((puzzle) => this._renderPuzzle(puzzle))}
      </Table.Row>
    );
  }

  _renderPuzzle(puzzle) {
    const { score, start, end } = puzzle;
    const started = Boolean(start);
    const finished = Boolean(end);
    const inProgress = started && !finished;
    return (
      <Table.Cell key={puzzle.puzzleId} positive={finished}>
        { finished ? renderScore(puzzle.score).time : null }
        { inProgress ? <div>In Progress <Icon name="spinner" color="blue" loading/></div> : null }
        { !started ? "Unstarted" : null }
      </Table.Cell>
    );
  }
}

AdminLeaderboardDivisionTable.propTypes = {
  division: PropTypes.string.isRequired,
  teams: PropTypes.arrayOf(Object).isRequired,
};

export default AdminLeaderboardDivisionTable;
