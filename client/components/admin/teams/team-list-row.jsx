import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Segment, Header } from 'semantic-ui-react';

AdminTeamListRow = class AdminTeamListRow extends Component {
  render() {
    const { team } = this.props;
    return (
      <Segment basic>
        <Header as='h2' content={ team.name } />
        <AdminTeamMembers team={ team }/>
      </Segment>
    )
  }
}

AdminTeamListRow.propTypes = {
  team: PropTypes.object.isRequired,
};
