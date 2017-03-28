import React, { PropTypes } from 'react';

export default class InactivePuzzle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>Inactive Puzzle</div>);
  }
}

InactivePuzzle.propTypes = {
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
};
