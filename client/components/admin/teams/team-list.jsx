import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Container, Grid, Segment } from 'semantic-ui-react';

AdminTeamList = class AdminTeamList extends Component {
  render() {
    if (!this.props.teams) return <Loading />;
    return (
      <Container>
        <PuzzlePageTitle title='Teams'/>
        { this._getTeamList() }
      </Container>
    );
  }

  _getTeamList() {
    return this.props.teams.map((team) => <AdminTeamListRow key={team._id} team={team} />);
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
