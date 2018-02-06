import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';

import DebounceSearch from '../../imports/DebounceSearch';
import AdminTransactionsTracker from './imports/AdminTransactionsTracker';

AdminTransactions = class AdminTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  render() {
    const { search } = this.state;
    return (
      <Container>
        <PuzzlePageTitle title="Admin: Transactions" />
        <Grid stackable>

          <Grid.Row>
            <Grid.Column>
              <DebounceSearch
                fluid
                icon='search'
                placeholder='Search by Name, Email, or Transaction Id'
                delay={350}
                onSearch={(search) => this.setState({ search })}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <AdminTransactionsTracker search={search} />
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </Container>
    )
  }
}