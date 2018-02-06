import React, { Component } from 'react';
import { Segment, Dimmer, Loader} from 'semantic-ui-react';

Loading = class Loading extends Component {
  render() {
    return (
    <Segment>
      <Loader active>Loading</Loader>
      <br/> <br/>
      <br/> <br/>
      <br/> <br/>
    </Segment>
    );
  }
};
