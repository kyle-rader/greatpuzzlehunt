import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import { times } from 'lodash';

TeamList = class TeamList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const teamsToRender = this._mapTeams();
    return (
      <Card.Group>
        { teamsToRender }
      </Card.Group>
    );
  }

  _mapTeams() {
    const { teams } = this.props;
    const mappedTeams = Array(teams.length);
    times(teams.length, (i) => {
      mappedTeams[i] = <TeamListCard team={teams[i]} key={teams[i]._id}/>;
    });
    return mappedTeams;
  }
}

TeamList.propTypes = {
  teams: React.PropTypes.array.isRequired,
};
