import React, {PropTypes} from 'react';
import { Container, Segment, Button } from 'semantic-ui-react';

import getPlatform from './imports/get-platform';

Volunteer = class Volunteer extends React.Component {
  constructor(props) {
    super(props);
    const platform = getPlatform();
    this.state = {
      platform,
      android: platform === 'android',
      ios: platform === 'ios',
    }
  }

  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Volunteer Home'/>
        <Segment basic>
          { this._scanQRButton() }
        </Segment>
        <Segment basic>
          { this._appDownloadButton() }
        </Segment>
      </Container>
    );
  }

  _scanQRButton() {
    return <Button as='a'
      size='big'
      color='green'
      href="zxing://scan/"
      content='Scan a QR code'
    />;
  }

  _appDownloadButton() {
    let href = null;
    if (this.state.android) {
      href='https://play.google.com/store/apps/details?id=com.google.zxing.client.android&hl=en'
    } else if (this.state.ios) {
      href='https://itunes.apple.com/us/app/qrafter-qr-code-barcode-reader/id416098700?mt=8&ign-mpt=uo%3D4#'
    }
    return <Button as='a'
      basic
      href={ href }
      content='Download QR App'
    />
  }
}

Volunteer.propTypes = {
};
