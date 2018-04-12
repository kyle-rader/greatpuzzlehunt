import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Container, Message, Button } from 'semantic-ui-react';

import TeamComp from '../../imports/TeamComp';
import GameUI from './GameUI.jsx';

class GameTeamWrapper extends Component {
  render() {
    return (
      <Container>
        {this._title()}
        {this._content()}
      </Container>
    );
  }

  _title() {
    const { ready, team } = this.props;
    return <PuzzlePageTitle title={team ? team.name : 'The Game'} />;
  }

  _content() {
    const { ready, team } = this.props;
    if (!ready) {
      return <Loading/>;
    }

    if (!team) {
      return <NoTeamMessage/>;
    }

    if (!team.checkinConfirmed) {
      return this._checkin();
    }

    return <GameUI team={team} />
  }

  _checkin() {
    return (
      <Message info size="large">
        <Message.Header>You need to check in!</Message.Header>
        <Message.Content><p></p><Link to="/team/checkin"><Button color="green" content="Check In"/></Link></Message.Content>
      </Message>
    );
  }
}

GameTeamWrapper.propTypes = {
  ready: PropTypes.bool.isRequired,
  team: PropTypes.object,
};

export default TeamComp(GameTeamWrapper);
