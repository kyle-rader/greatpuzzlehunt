import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Card, Icon, Button, Progress } from 'semantic-ui-react';
import moment from 'moment';

import { DEVISION_MAP } from './imports/team-helpers.js';

TeamListCard = class TeamListCard extends Component {
  constructor(props) {
    super(props);
    const { team } = this.props;

    this.state = {
      isFull: team.members.length >= 6,
      memberCount: team.members.length,
      updatedAt: moment(team.updatedAt).fromNow(),
      division: DEVISION_MAP[team.division],
      showPasswordField: false,
    };
  }

  render() {
    const { division, showPasswordField, isFull, memberCount, updatedAt } = this.state;
    const { team } = this.props;
    const membersLabel = `${memberCount} of 6 members`;
    const membersPercent = Math.round((memberCount / 6)*100);
    const progressColor = isFull ? 'blue' : 'green';
    return (
      <Card centered>
        <Card.Content>
          <Card.Header>{team.name}</Card.Header>
          <Card.Meta><Icon name='sitemap'/> { division } </Card.Meta>
          <Card.Description><Progress size='small' percent={membersPercent} color={progressColor}>{membersLabel}</Progress></Card.Description>
        </Card.Content>
        <Card.Content extra>
          Updated<br/>
          { updatedAt }
          {!isFull ? <Button size='small' floated='right' icon='reply' labelPosition='right' content='Join Team'/> : null}
        </Card.Content>
      </Card>
    );
  }
}

TeamListCard.propTypes = {
  team: React.PropTypes.object.isRequired,
};
