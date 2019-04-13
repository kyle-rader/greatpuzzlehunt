import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { Segment, Grid, Header, Button, Image, Message, Confirm } from 'semantic-ui-react';
import { getHintsTaken } from '../../../../lib/imports/puzzle-helpers';

const HINT_COST = [5, 10, 15];

export default class PuzzleHints extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showConfirm: false,
      hintToTake: null,
    };
    this.gridStyle = {
      paddingTop: '15px',
    };
  }

  render() {
    const { team, puzzle } = this.props;
    if (!puzzle.hints || puzzle.hints.length === 0) return <br/>;

    const { showConfirm, hintToTake } = this.state;
    const currentHintCost = HINT_COST[getHintsTaken(puzzle)];

    return (
      <Grid style={ this.gridStyle }>
        { this._renderHints() }

        <Confirm
          open={showConfirm}
          header="Are you sure?"
          content={<Segment basic style={{fontSize: '16px'}}><p>Do you want to take <b>Hint {hintToTake + 1}</b>?</p><p>Cost: <b>{currentHintCost} minutes</b></p></Segment>}
          confirmButton={`Take the Hint!`}
          cancelButton="Nevermind"
          onCancel={() => this.setState({showConfirm: false, hintToTake: null })}
          onConfirm={() => this._takeHint()}
          size="large"
        />
      </Grid>
    );
  }

  _renderHints() {
    const { team, puzzle } = this.props;

    return puzzle.hints.map((hint, i) => (
      <Grid.Row columns='1' key={`${puzzle.puzzleId}_hint${i}`}>
        <Grid.Column>
          { this._renderHint(hint, i) }
        </Grid.Column>
      </Grid.Row>
    ));
  }

  _renderHint(hint, i) {
    if (hint.taken) {
      return (
        <Message>
          <p>{ hint.text }</p>
          <br/>
          {hint.imageUrl ?
            <Image as="a" href={hint.imageUrl} src={hint.imageUrl }/>
            :
            null
          }
        </Message>
      );
    } else {
      return <Button
        content={ `Take Hint ${i+1}` }
        onClick={ () => this.setState({ showConfirm: true, hintToTake: i }) }
      />;
    }
  }

  _takeHint() {
    const { team, puzzle } = this.props;
    const { hintToTake } = this.state;

    Meteor.call('team.puzzle.takeHint', puzzle.puzzleId, hintToTake, (error, result) => {
      if (error) return alert(error.reason);
      this.setState({ showConfirm: false, hintToTake: null });
    });
  }
}

PuzzleHints.propTypes = {
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
};
