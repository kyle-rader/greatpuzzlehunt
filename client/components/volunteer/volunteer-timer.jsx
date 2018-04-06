import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Segment, Message, Button } from 'semantic-ui-react';

import VolunteerPuzzles from './imports/volunteer-puzzles';

class VolunteerTimerInner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { ready, team } = this.props;
    return (
      <Container>
        <PuzzlePageTitle title='Volunteer Timer'/>
          { this._timerUI() }
          <br/>
          <Button basic size='large' fluid color='violet' content='Close This Page' onClick={(e) => window.close() }/>
      </Container>
    );
  }

  _timerUI() {
    const { ready, team, params } = this.props;
    if (!ready) {
      return <Loading />
    } else if (!team) {
      return <Message
        negative
        header='Oops!'
        content={ `No team with id ${prams.teamId}` }
      />;
    } else {
      return <VolunteerPuzzles team={ team } targetPuzzle={ params.puzzleId }/>;
    }
  }
}

VolunteerTimerInner.propTypes = {
  ready: PropTypes.bool.isRequired,
  team: PropTypes.object,
};

// In this container "params" is coming from the props added via react-router.
VolunteerTimer = withTracker(({ params }) => {
  const { teamId, puzzleId } = params;
  const handle = Meteor.subscribe('volunteer.team', teamId);
  const ready = handle.ready();
  const team = Teams.findOne(teamId);
  return {
    ready,
    team,
  };
})(VolunteerTimerInner);
