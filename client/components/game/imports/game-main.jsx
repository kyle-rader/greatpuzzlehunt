import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Container, Message, Statistic } from 'semantic-ui-react';

import { makeTeamComp } from '../../team/imports/team-helpers';
import GameUI from './game-ui.jsx';

class GameMain extends Component {
  render() {
    const { ready, team } = this.props;

    if (!ready) {
      return this._loading();
    }
    if (ready && !team) {
      return this._noTeam();
    }

    return (
      <Container>
        <PuzzlePageTitle title={ team.name }/>
        <GameUI team={ team } />
      </Container>
    );
  }

  _noTeam() {
    return (
      <Container>
        <PuzzlePageTitle title='The Game'/>
        <NoTeamMessage/>
      </Container>
    );
  }
  _loading() {
    return (
      <Container>
        <br/>
        <Loading/>
      </Container>
    );
  }

}

GameMain.propTypes = {
  ready: PropTypes.bool.isRequired,
  team: PropTypes.object,
  now: PropTypes.object,
};

export default makeTeamComp(GameMain);
