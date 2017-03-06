import React, { Component } from 'react';
import { Message, Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router';

NoTeamMessage = class NoTeamMessage extends Component {
  render() {
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
          { this.props.children }
        </Message.Content>
      </Message>
    );
  }
}
