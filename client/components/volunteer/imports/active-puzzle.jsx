import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { Segment, Header, Progress, Button } from 'semantic-ui-react';

export default class ActivePuzzle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { team, puzzle } = this.props;

    return (
      <Segment>
        <Header as='h3' content={ puzzle.name }/>
        Puzzle timer coming...
      </Segment>
    );
  }
}

ActivePuzzle.propTypes = {
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
};
