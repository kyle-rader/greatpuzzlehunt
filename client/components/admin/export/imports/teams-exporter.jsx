import React, {PropTypes} from 'react';
import { Container, Button, Checkbox } from 'semantic-ui-react';

import Clipboard from 'clipboard';

export default class TeamsExporter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersOnly: true,
    };
  }

  componentDidMount() {
    const cb = new Clipboard('.ui.copy.button');
  }

  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Team & User Export'/>
        <Checkbox
          checked={ this.state.usersOnly }
          label='Users Only ?'
          style={ { paddingRight: '10px' } }
          onChange={ (e, data) => this.setState({ usersOnly: data.checked })}
        />
        <Button
          basic color='green'
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
      lines.push(`${team.division},${team.name}, , `);
      team.members.forEach((user) => {
        if (this.state.usersOnly && user.roles.length > 1) return;
        lines.push(`,,${team.owner === user._id ? '** ' : ''}${user.firstname},${user.lastname}`);
      });
      lines.push(`,,,`);
    });
    return lines.join("\n");
  }
}

TeamsExporter.propTypes = {
  teams: PropTypes.array.isRequired,
};
