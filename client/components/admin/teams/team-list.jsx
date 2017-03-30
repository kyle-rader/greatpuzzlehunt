import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Container, Grid, Segment, Message } from 'semantic-ui-react';

AdminTeamList = class AdminTeamList extends Component {
  render() {
    if (!this.props.teams) return <Loading />;
    return (
      <Container>
        <PuzzlePageTitle title='Teams'/>
        { this._teamCounts() }
        { this._getTeamList() }
      </Container>
    );
  }

  _getTeamList() {
    return this.props.teams.map((team) => <AdminTeamListRow key={team._id} team={team} />);
  }

  _teamCounts() {
    const { teams } = this.props;
    const validTeams = teams.filter((t) => t.members.length >= 4);
    const fullTeams = validTeams.filter((t) => t.members.length === 6);
    const shortTeams = teams.length - validTeams.length;
    const haveBegun = teams.filter((t) => Boolean(t.hasBegun));
    return (
      <Message info>
        <Message.Header>Team Counts</Message.Header>
        <pre>
          Total : { teams.length } <br/>
          Full  : { fullTeams.length } <br/>
          Valid : { validTeams.length } <br/>
          Short : { shortTeams } <br/>

          Have Begun: { haveBegun.length } <br/>
        </pre>
      </Message>
    );
  }

}

AdminTeamList = createContainer((props) => {
  const teamsHandle = Meteor.subscribe('admin.teams');
  const loading = !teamsHandle.ready();

  const options = {};

  const teams = Teams.find({}, options).fetch();

  return {
    loading,
    teams,
  };
}, AdminTeamList);
