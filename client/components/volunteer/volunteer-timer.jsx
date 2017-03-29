import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Container, Segment, Message, Button } from 'semantic-ui-react';

import VolunteerTimerUI from './imports/volunteer-timer-ui';

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
          <Button basic size='large' fluid color='blue' content='Close This Page' onClick={(e) => window.close() }/>
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
      return <VolunteerTimerUI team={ team }/>;
    }
  }
}

VolunteerTimerInner.propTypes = {
  ready: PropTypes.bool.isRequired,
  team: PropTypes.object,
};

// In this container "params" is coming from the props added via react-router.
VolunteerTimer = createContainer(({ params }) => {
  const { teamId, puzzleId } = params;
  const handle = Meteor.subscribe('volunteer.team', teamId);
  const ready = handle.ready();
  const team = Teams.findOne(teamId);
  return {
    ready,
    team,
  };
}, VolunteerTimerInner);
