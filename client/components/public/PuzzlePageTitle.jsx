import React, { Component, PropTypes } from 'react';
import { Grid, Segment } from 'semantic-ui-react';

PuzzlePageTitle = class PuzzlePageTitle extends Component {
  render() {
    const smallStyle = {
      fontSize: '.65em',
    };
    return (
    <Grid stackable padded className='puzzle-page-title filling'>
      <Grid.Row>
        <Grid.Column>
          <Segment basic>
            <h1 className='dark-blue'>
              {this.props.title}<br/>
              <small style={ smallStyle }>{this.props.subTitle}</small>
            </h1>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    );
  }
}

PuzzlePageTitle.propTypes = {
  title: PropTypes.node.isRequired,
  subTitle: PropTypes.string,
};
