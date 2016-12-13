import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Segment, Header, Icon, Button, Message, Grid } from 'semantic-ui-react';

TeamPreview = class TeamPreview extends Component {
  constructor(props) {
    super(props);
    this.state = this._makeStateFromProps(props);
  }

  _makeStateFromProps(props) {
    return {
      hasTeam: (props.user && props.user.teamId),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._makeStateFromProps(nextProps));
  }

  render() {
    const content = this.state.hasTeam ? this._renderWithTeam() : this._renderWithoutTeam();

    return (
      <Segment basic>
        <Header as="h3" icon={<Icon name="users" color="blue"/>} content="Team"/>
        {content}
      </Segment>
    );
  }

  _renderWithTeam() {
    return (
    <div></div>
    );
  }

  _renderWithoutTeam() {
    return (
    <Message info>
      <Message.Header>You don't have a team yet!</Message.Header>
      <Message.Content>
        <br/>
        <Grid stackable>
          <Grid.Row columns='2' widths='equal'>
            <Grid.Column>
              <Link to='/team/create'><Button fluid content='Create a Team' icon='right arrow' labelPosition='right'/></Link>
              <br/>
              Create a new team and invite your friends
            </Grid.Column>
            <Grid.Column>
              <Link to='/team/join'><Button fluid content='Join a Team' icon='right arrow' labelPosition='right'/></Link>
              <br/>
              Browse existing teams that are looking for more members
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Message.Content>
    </Message>
    );
  }

}

TeamPreview.propTypes = {
  user: React.PropTypes.object.isRequired,
};
