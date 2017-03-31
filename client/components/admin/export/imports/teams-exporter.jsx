import React, {PropTypes} from 'react';
import { Container, Button } from 'semantic-ui-react';

import Clipboard from 'clipboard';

export default class TeamsExporter extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const cb = new Clipboard('.ui.copy.button');
  }

  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Team & User Export'/>
        <Button
          basic
          className='copy'
          content='Copy'
          data-clipboard-target='#team-export'
        />
        <pre id='team-export'>
          { this._renderLines() }
        </pre>
      </Container>
    );
  }

  _renderLines() {
    const { teams } = this.props;
    const lines = ["Team Name,First Name,Last Name"];
    teams.forEach((team) => {
      lines.push(`${team.name}, , `);
      team.members.forEach((user) => {
        lines.push(` ,${team.owner === user._id ? '** ' : ''}${user.firstname},${user.lastname}`);
      });
      lines.push(`,,`);
    });
    return lines.join("\n");
  }
}

TeamsExporter.propTypes = {
  teams: PropTypes.array.isRequired,
};
