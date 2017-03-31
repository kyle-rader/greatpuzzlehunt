import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { Grid, Header, Button, Image, Message } from 'semantic-ui-react';

export default class PuzzleHints extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.gridStyle = {
      paddingTop: '15px',
    };
  }

  render() {
    const { showHints } = this.state;
    const { team, puzzle } = this.props;

    return (
      <Grid style={ this.gridStyle }>
        { this._renderHints() }
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
          <p>{ hint.description }</p>
          { hint.image.url ? <Image src={ hint.image.url }/> : null }
        </Message>
      );
    } else {
      return <Button
        content={ `Take Hint ${i+1}` }
        onClick={ () => this._takeHint(i) }
      />;
    }
  }

  _takeHint(i) {
    const { team, puzzle } = this.props;
    const confirmMsg = `Are you Sure you want to take hint ${i+1}?`;
    if (!confirm(confirmMsg)) return;

    Meteor.call('team.puzzle.takeHint', puzzle.puzzleId, i, (error, result) => {
      if (error) alert(error.reason);
    });
  }
}

PuzzleHints.propTypes = {
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
};
