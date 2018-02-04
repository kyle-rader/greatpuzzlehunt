import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid } from 'semantic-ui-react';

export default class RowBuffer extends Component {
  render() {
    return (
      <Grid.Row>
        <Grid.Column className='dark-blue'><br/></Grid.Column>
      </Grid.Row>
    )
  }
}
