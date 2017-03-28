import React, {PropTypes} from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import QR from 'qrcode.react';

export default class UnstartedPuzzle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showQRcode: false,
    };
  }

  render() {
    const { team, puzzle, disabled } = this.props;
    const startUrl = `${window.location.origin}/volunteer/time/${team._id}/${puzzle.puzzleId}`;
    return (
      <Segment disabled={ this.props.disabled }>
        <Header as='h3' content={ this.props.puzzle.name }/>
        { disabled ? null : this._toggleQRButton() }
        { disabled ? null : this._qrCode(startUrl) }
      </Segment>
    );
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
    );
  }
}

UnstartedPuzzle.propTypes = {
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};
