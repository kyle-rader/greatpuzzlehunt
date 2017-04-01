import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Container, Message, Header, Statistic, Progress } from 'semantic-ui-react';

class GameStats extends Component {
  constructor(props) {
    super(props);

    this.state = this._stateFromProps(props);
  }

  componentWillReceiveProps(props) {
    const newState = this._stateFromProps(props);
    if (newState.finished !== this.state.finished) {
      Meteor.setTimeout(() => $('.ui.button.scroll-top-btn').click(), 1500);
    }
    this.setState(newState);
  }

  _stateFromProps(props) {
    const { team } = props;
    const puzzlesSolved = team.puzzles.reduce((acc, p) => (acc + (p.score ? 1 : 0)), 0);
    return {
      puzzlesSolved,
      finished: team.puzzles.length === puzzlesSolved,
    };
  }

  render() {
    const { team } = this.props;
    const { puzzlesSolved, finished } = this.state;
    return (
      <Container fluid>
        <Message info={ !finished } positive={ finished }>
          <Message.Header>Team Stats</Message.Header>
          <p>
            <strong>Starting Location:</strong> { team.startLocation } <br/>
            <strong>Puzzles Solved:</strong> { puzzlesSolved }
          </p>
          { this._doneMessage() }
        </Message>
      </Container>
    );
  }

  _doneMessage() {
    const { finished } = this.state;
    if (!finished) return null;
    return (
      <Header as='h3'
        content="Congratulations! You've finished the 2017 Puzzle Hunt!"
        subheader="Head back to Red Square"
      />
    );
  }

}

GameStats.propTypes = {
  team: PropTypes.object.isRequired,
};

export default GameStats;
