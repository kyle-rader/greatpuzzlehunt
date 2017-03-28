import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { Segment, Header, Progress, Button } from 'semantic-ui-react';
import QR from 'qrcode.react';

export default class InactivePuzzle extends React.Component {
  constructor(props) {
    super(props);
    const { team, puzzle } = props;
    this.state = {
      disabled: Boolean(team.currentPuzzle),
      complete: Boolean(puzzle.score),
      showQRcode: false,
    };
  }

  render() {
    const { team, puzzle } = this.props;
    const { complete } = this.state;
    if (complete) {
      return this._completePuzzle();
    } else {
      return this._unstartedPuzle(team, puzzle);
    }
  }

  _completePuzzle() {
    return <div>Puzzle Done!</div>;
  }

  _unstartedPuzle(team, puzzle) {
    const startUrl = `${window.location.origin}/volunteer/time/${team._id}/${puzzle.puzzleId}`;
    return (
      <Segment disabled={ this.state.disabled }>
        { this._header() }
        { this._toggleQRButton() }
        { this._qrCode(startUrl) }
      </Segment>
    )
  }

  _header() {
    return <Header as='h3' content={ this.props.puzzle.name }/>
  }

  _toggleQRButton() {
    return <Button basic color='green'
      content={ this.state.showQRcode ? 'Hide QR Code' : 'Start Puzzle' }
      onClick={ () => this._toggleQRcode() }
    />;
  }

  _toggleQRcode() {
    this.setState({ showQRcode: !this.state.showQRcode });
  }

  _qrCode(url) {
    if (!this.state.showQRcode) return null;
    return (
      <Segment basic textAlign='center'>
        <Header as='h4' content='Show this QR Code to a volunteer to start!'/>
        <QR value={ url } size={ 212 }/>
      </Segment>
    )
  }
}

InactivePuzzle.propTypes = {
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
};
