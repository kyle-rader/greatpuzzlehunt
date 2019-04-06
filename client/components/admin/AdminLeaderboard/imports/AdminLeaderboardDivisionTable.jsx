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
import { getHintsTaken, getFinalScore } from '../../../../../lib/imports/puzzle-helpers';

const UNFINISHED_OFFSET = 26000;

class AdminLeaderboardDivisionTable extends Component {
  render() {
    const { division, teams } = this.props;

    const preSortedTeams = sortBy(teams, (team) => {
      return getFinalScore(team) + (team.finished ? 0 : UNFINISHED_OFFSET);
    });
    const sortedTeams = sortBy(preSortedTeams, team => {
      /* Sort by the number of puzzles completed (not include those that they gave up on) */
      let nComplete = 0;
      team.puzzles.forEach(puzzle => {
        const { gaveUp, end } = puzzle;
        if(end && !gaveUp) nComplete++;
      });
      console.log(`${team.name} completed ${nComplete} puzzles`);
      return -nComplete;
    });

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
          {teams.map((team, i) => this._renderTeamRow(team, i))}
        </Table.Body>
      </Table>
    );
  }

  _renderTeamRow(team, i) {
    const { _id: teamId, name, members, memberIds, puzzles, finished } = team;
    const finalScore = getFinalScore(team);

    return (
      <Table.Row key={teamId}>
        <Table.Cell>{i+1} | {name}</Table.Cell>
        <Table.Cell>{members.length} / {memberIds.length}</Table.Cell>
        <Table.Cell positive={finished} warning={!finished}>
          <code>{renderScore(finalScore).time} ({finalScore} sec)</code> {!finished ? <Icon name="spinner" color="blue" loading /> : null}
        </Table.Cell>
        {puzzles.map((puzzle) => this._renderPuzzle(puzzle))}
      </Table.Row>
    );
  }

  _renderPuzzle(puzzle) {
    const { score, start, end, gaveUp } = puzzle;
    let hintsTaken = getHintsTaken(puzzle);
    const started = Boolean(start);
    const finished = Boolean(end);
    const inProgress = started && !finished;
    return (
      <Table.Cell key={puzzle.puzzleId} positive={finished} warning={!finished}>
        { gaveUp ? <Icon name="ban" color="red" /> : null }
        {finished ? <code>{renderScore(puzzle.score).time} (hints {hintsTaken}) ({puzzle.score} sec)</code> : null }
        {inProgress ? <div><Icon name="spinner" color="blue" loading /> In Progress</div> : null }
        { !started ? <code>--:--:--</code> : null }
      </Table.Cell>
    );
  }
}

AdminLeaderboardDivisionTable.propTypes = {
  division: PropTypes.string.isRequired,
  teams: PropTypes.arrayOf(Object).isRequired,
};

export default AdminLeaderboardDivisionTable;
