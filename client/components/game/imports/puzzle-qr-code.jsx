import React, {PropTypes} from 'react';
import { Grid, Segment, Header, Button } from 'semantic-ui-react';
import QR from 'qrcode.react';

export default class PuzzleQRCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showQRcode: false,
    };
  }

  render() {
    const { team, puzzle, disabled } = this.props;
    if (disabled) return null;
    const url = `${window.location.origin}/volunteer/time/${team._id}/${puzzle.puzzleId}`;
    return (
      <Grid>
        <Grid.Row columns='1'>
          <Grid.Column>
            { disabled ? null : this._toggleQRButton() }
            { disabled ? null : this._qrCode(url) }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  _toggleQRButton() {
    return <Button basic color='green'
      content={ this.state.showQRcode ? 'Hide QR Code' : this.props.qrButtonLabel }
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
        <Header as='h4' content={ this.props.qrLabel }/>
        <QR value={ url } size={ 212 }/>
      </Segment>
    );
  }
}

PuzzleQRCode.propTypes = {
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  qrLabel: PropTypes.string.isRequired,
  qrButtonLabel: PropTypes.string.isRequired,
};
