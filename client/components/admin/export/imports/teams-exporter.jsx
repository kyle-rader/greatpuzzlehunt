import React, {PropTypes} from 'react';

export default class TeamsExporter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <pre>
        { JSON.stringify(this.props.teams, null, 2) }
      </pre>
    );
  }
}

TeamsExporter.propTypes = {
  teams: PropTypes.array.isRequired,
};
