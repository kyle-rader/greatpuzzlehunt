import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Grid, Form, Icon } from 'semantic-ui-react';

TeamManager = class TeamManager extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Team' />
      </Container>
    );
  }
}

TeamManager.propTypes = {
  user: React.PropTypes.object.isRequired,
};
