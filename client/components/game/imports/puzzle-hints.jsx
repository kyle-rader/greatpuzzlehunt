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
          { hint.url ? <Image src={ hint.url }/> : null }
        </Message>
      );
    } else {
      return <Button
        content={ `Take Hint ${i+1}` }
        onClick={ () => this._takeHint(i) }
      />;
    }
  }
}

PuzzleHints.propTypes = {
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
};
