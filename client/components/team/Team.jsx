import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Container, Segment, Header, Grid, Form, Icon } from 'semantic-ui-react';
import moment from 'moment';

import TeamComp from '../imports/TeamComp';

Team = class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUpdated: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const isVolunteer = nextProps.user ? nextProps.user.hasRole('volunteer') : false;
    const lastUpdated = nextProps.team ? moment(nextProps.team.updatedAt).fromNow() : null;

    this.setState({
      lastUpdated,
      isVolunteer,
    });
  }

  render() {
    // If you are a volunteer - hide teams all together
    const { isVolunteer } = this.state;
    if (isVolunteer) {
      browserHistory.push('/volunteer');
    }

    const { ready, team, user } = this.props;
    let content = <Loading/>;
    if (ready) {
      content = team ? this._renderMain() : <Segment basic><NoTeamMessage><ProfileInvites user={user}/></NoTeamMessage></Segment>;
    }

    return (
      <Container>
        <PuzzlePageTitle title={this._getTitle()} subTitle={this.state.lastUpdate ? `Last Updated: ${this.state.lastUpdated}` : ''}/>
        {content}
      </Container>
    );
  }

  _getTitle() {
    return this.props.team ? `Team: ${this.props.team.name}` : 'Team';
  }

  _renderMain() {
    return (
      <Segment basic key='settings'>

        <Header as='h3' icon={<Icon name='settings' color='violet'/>} content='Settings'/>
        <TeamEditor showsSuccess={true} team={this.props.team}/>

        <Header as='h3' icon={<Icon name='add user' color='green'/>} content='Invite more members'/>
        <TeamInviter team={this.props.team} user={this.props.user}/>

        <Header as='h3' icon={<Icon name='users' color='blue'/>} content='Members'/>
        <TeamMembers team={this.props.team} user={this.props.user}/>

        <Header as='h3' icon={<Icon name='mail outline' color='orange'/>} content='Pending Invites'/>
        <TeamInvites team={this.props.team} user={this.props.user}/>

        <Header as='h3' icon={<Icon name='warning sign' color='red'/>} content='Danger Zone'/>
        <TeamDangerZone team={this.props.team} user={this.props.user}/>
      </Segment>
    );
  }
}

Team.propTypes = {
  ready: PropTypes.bool.isRequired,
  team: PropTypes.object,
};

Team = TeamComp(Team);
