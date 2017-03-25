import React, {PropTypes} from 'react';
import { Container, Segment, Button } from 'semantic-ui-react';

VolunteerTimer = class VolunteerTimer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Volunteer Timer'/>
        <Segment basic>
          <Button content='Done' onClick={(e) => window.close() }/>
          <Button content='Who am I' onClick={(e) => this.whoAmI(e) }/>
        </Segment>
      </Container>
    );
  }

  whoAmI(e) {
    alert(navigator.userAgent);
  }
}

VolunteerTimer.propTypes = {

};
