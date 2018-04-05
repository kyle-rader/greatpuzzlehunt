import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Grid, Container, Input, Menu, Icon, Label } from 'semantic-ui-react';

import DebounceSearch from '../../imports/DebounceSearch';
import AdminUserListTracker from './imports/AdminUserListTracker';

AdminUsers = class AdminUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSearch: '',
      teamSearch: '',
    };
  }

  render() {
    const { userSearch, teamSearch } = this.state;

    return (
      <Container>
        <PuzzlePageTitle title='Admin: Users'/>

        <Grid stackable>

          <Grid.Row columns={2}>
            <Grid.Column width={10}>
              <DebounceSearch
                fluid
                icon='search'
                placeholder='Search by First Name, Last Name, or Email'
                delay={350}
                onSearch={(search) => this.setState({ userSearch: search })}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <DebounceSearch
                fluid
                icon='search'
                placeholder='Search by Team Name'
                delay={350}
                onSearch={(search) => this.setState({ teamSearch: search })}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <AdminUserListTracker userSearch={userSearch} teamSearch={teamSearch}/>
            </Grid.Column>
          </Grid.Row>

        </Grid>

      </Container>
    );
  }
}
