import { meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Segment, Icon, Button, Image
} from 'semantic-ui-react';
import QR from 'qrcode.react';

class TeamCheckInQRCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQR: false,
    };
  }

  render() {
    const { showQR } = this.state;
    return (
      <Segment basic className="qr-code">
        {this._qrCode(showQR) }
        {this._toggleButton(showQR) }
      </Segment>
    );
  }

  _qrCode(showQR) {
    if (!showQR) {
      return null;
    }
    return (
      <QR value={this._qrUrl()} size={192} />
    );
  }

  _toggleButton(showQR) {
    return (
      <Button fluid basic={showQR} color={showQR ? "grey" : "green"} onClick={() => this._toggleQrCode(showQR)}>
        {this._toggleText(showQR)}
      </Button>
    );
  }

  _qrUrl() {
    const { teamId } = this.props;
    return `${window.location.origin}/volunteer/checkin/${teamId}`;
  }

  _toggleQrCode(showQR) {
    this.setState({ showQR: !showQR });
  }

  _toggleText(showQR) {
    return showQR ? "Hide QR Code" : "Check In with Volunteer";
  }
}

TeamCheckInQRCode.propTypes = {
  teamId: PropTypes.string.isRequired,
};

export default TeamCheckInQRCode;
