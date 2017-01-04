import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Segment, Header, Grid, Form, Icon } from 'semantic-ui-react';
import { makeTeamComp } from './imports/team-helpers.js';
import moment from 'moment';

TeamManager = class TeamManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUpdated: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.team) {
      this.setState({ lastUpdated: moment(nextProps.team.updatedAt).fromNow() });
    } else {
      this.setState({ lastUpdated: null });
    }
  }

  render() {
    const content = this.props.team ? this._renderMain() : <Segment basic><NoTeamMessage><ProfileInvites user={this.props.user}/></NoTeamMessage></Segment>;

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

TeamManager = makeTeamComp(TeamManager);
