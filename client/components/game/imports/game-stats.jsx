import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Container, Message, Statistic, Progress } from 'semantic-ui-react';

class GameStats extends Component {
  constructor(props) {
    super(props);

    this.state = this._stateFromProps(props);
  }

  componentWillReceiveProps(props) {
    this.setState(this._stateFromProps(props));
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
      <p>
        <h3>Congratulations! You've finished the 2017 Puzzle Hunt!</h3>
        <h4>Head back to Red Square</h4>
      </p>
    );
  }

}

GameStats.propTypes = {
  team: PropTypes.object.isRequired,
};

export default GameStats;
