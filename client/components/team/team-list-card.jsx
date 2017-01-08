import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Card, Icon, Button, Progress, Form } from 'semantic-ui-react';
import moment from 'moment';

import { DEVISION_MAP } from './imports/team-helpers.js';

TeamListCard = class TeamListCard extends Component {
  constructor(props) {
    super(props);
    const { team } = this.props;

    this.state = {
      isFull: team.members.length >= 6,
      memberCount: team.members.length,
      division: DEVISION_MAP[team.division],
      showPasswordField: false,
      password: '',
    };
  }

  render() {
    const { division, showPasswordField, isFull, memberCount } = this.state;
    const { team } = this.props;
    const membersLabel = `${memberCount} of 6 members`;
    const membersPercent = Math.round((memberCount / 6)*100);
    const progressColor = isFull ? 'blue' : 'green';
    return (
      <Card centered>
        <Card.Content>
          <Card.Header>{ team.name }</Card.Header>
          <Card.Meta><Icon name='sitemap'/> { division }</Card.Meta>
          <Card.Description>
            <Progress size='small' percent={ membersPercent } color={progressColor}>{ membersLabel }</Progress>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          { !isFull && !showPasswordField ?
            <Button size='small' floated='right' icon='reply' labelPosition='right' content='Join Team' onClick={() => this.setState({ showPasswordField: true })}/>
            : null
          }
          { !isFull && showPasswordField ?
            this._renderPasswordField()
            : null
          }
        </Card.Content>
      </Card>
    );
  }

  _renderPasswordField() {
    return (
      <Form onSubmit={(e) => this._handlePasswordSubmit(e)}>
        <Form.Input name='password' label='Team Password' value={ this.state.password } onChange={(e) => this.setState({ password: e.target.value })}/>
        <Button color='green' type='submit' content='Submit' size='small'/>
        <Button floated='right' color='red' inverted content='Cancel' size='small' onClick={(e) => this._cancel(e)}/>
      </Form>
    );
  }

  _handlePasswordSubmit(e) {
    e.preventDefault();
    console.log(`Join team ${this.props.team.name} with password ${this.state.password}`);
  }

  _cancel(e) {
    e.preventDefault();
    this.setState({ password: '', showPasswordField: false });
  }
}

TeamListCard.propTypes = {
  team: React.PropTypes.object.isRequired,
};
