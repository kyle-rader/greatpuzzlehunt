import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Grid, Container, Input, Menu, Icon, Label } from 'semantic-ui-react';

import AdminUserListTracker from './imports/AdminUserListTracker';

AdminUsers = class AdminUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      searchToPass: '',
    };

    this._updateSearchToPass = _.debounce(() => {
      this.setState({ searchToPass: this.state.search });
    }, 500);
  }

  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Admin: Users'/>
        { this._renderGrid() }
      </Container>
    );
  }

  _renderGrid() {
    return (
      <Grid stackable>
        <Grid.Row>
          <Grid.Column>
            <Input name='search' placeholder='Search...' fluid icon='search' value={this.state.search} onChange={(e) => this._handleSearchChange(e)}/>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <AdminUserListTracker search={this.state.searchToPass} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  _handleSearchChange(e) {
    this.setState({ search: e.target.value })
    this._updateSearchToPass();
  }
}
