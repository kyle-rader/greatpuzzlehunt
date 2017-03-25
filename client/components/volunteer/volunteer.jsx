import React, {PropTypes} from 'react';
import { Container, Segment, Button } from 'semantic-ui-react';

import getPlatform from './imports/get-platform';

Volunteer = class Volunteer extends React.Component {
  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Volunteer Home'/>
        <Segment basic>
          <Button as='a'
            href="intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;end"
            content='Take a QR code'
          />
          <Button content='Platform?' onClick={ () => alert(getPlatform()) }/>
        </Segment>
      </Container>
    );
  }
}

Volunteer.propTypes = {
};
