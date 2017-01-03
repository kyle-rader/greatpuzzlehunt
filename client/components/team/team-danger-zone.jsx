import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Button, Icon, Message } from 'semantic-ui-react';

TeamDangerZone = class TeamDangerZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
    };
  }

  render() {
    if (this.props.user._id === this.props.team.owner) {
      return this._renderDeleteTeam();
    } else {
      return this._renderLeaveTeam();
    }
  }

  _renderLeaveTeam() {
    return <Button content='Leave Team' icon='trash' labelPosition='right' color='red' onClick={() => this._handleLeaveTeam()}/>;
  }

  _handleLeaveTeam() {
    if (confirm(`Are you sure you want to leave ${this.props.team.name}?`)) {
      Meteor.call('teams.leave', (error, result) => {
        if (error) return alert(error.reason);
      });
    }
  }

  _renderDeleteTeam() {
    return <Button content='Delete Team' icon='trash' labelPosition='right' color='red' onClick={() => this._handleDeleteTeam()}/>;
  }

  _handleDeleteTeam() {
    if (confirm(`Are you sure you want to delete ${this.props.team.name}?\n(This will remove all members from the team!)`)) {
      Meteor.call('teams.delete', (error, result) => {
        if (error) return alert(error.reason);
      });
    }
  }

}

TeamDangerZone.propTypes = {
  team: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
};
