import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Grid, Container, Input, Menu, Icon, Label } from 'semantic-ui-react';
import AdminUserList from './imports/admin-user-list';

import ReactPaginate from 'react-paginate';

const PAGE_LIMIT = 25;

AdminUsers = class AdminUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      search: '',
      seachToPass: '',
      users: 1,
      pages: 1,
    };

    this._updateSearchToPass = _.debounce(() => {
      this.setState({ searchToPass: this.state.search });
    }, 500);

    this.userCountInterval = Meteor.setInterval(() => Meteor.call('userCount', (error, result) => {
      if (error) return alert(error);
      const pages = Math.ceil(result / PAGE_LIMIT);
      this.setState({ users: result, pages });
    }), 1000);
  }

  componentWillUnmount() {
    Meteor.clearInterval(this.userCountInterval);
  }

  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Users'/>
        { this._renderGrid() }
      </Container>
    );
  }

  _renderGrid() {
    return (
      <Grid stackable>
        <Grid.Row columns={3}>
          <Grid.Column width={7}>
            { this._pagination() }
          </Grid.Column>
          <Grid.Column width={2} verticalAlign='middle'>
            <Icon name='users' color='green'/> { this.state.users }
          </Grid.Column>
          <Grid.Column stretched width={7}>
            <Input name='search' placeholder='Search...' fluid icon='search' value={this.state.search} onChange={(e) => this._handleSearchChange(e)}/>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <AdminUserList page={this.state.page} search={this.state.searchToPass} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  _pagination() {
    return <ReactPaginate
      pageCount={ this.state.pages }
      pageRangeDisplayed={1}
      marginPagesDisplayed={1}
      initialPage={0}
      containerClassName='ui pagination menu'
      pageClassName='item btn'
      previousClassName='item btn'
      nextClassName='item btn'
      breakClassName='item break'
      activeClassName='active'
      previousLabel='Prev'
      onPageChange={(page) => this._handlePageChange(page)}
    />;
  }

  _handleSearchChange(e) {
    this.setState({ search: e.target.value })
    this._updateSearchToPass();
  }

  _handlePageChange({ selected }) {
    this.setState({ page: selected, search: '', searchToPass: '' });
  }
}
