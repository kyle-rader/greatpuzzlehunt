import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import {
  Grid,
  Input,
  Menu,
  Icon,
  Label,
} from 'semantic-ui-react';

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
    }, 300);

    Meteor.call('userCount', (error, result) => {
      if (error) return alert(error);
      const pages = Math.ceil(result / PAGE_LIMIT);
      this.setState({ users: result, pages });
    });
  }

  render() {
    return (
    <Grid>
      <Grid.Row>
        <Grid.Column width='7'>
          { this._pageMenu() }
        </Grid.Column>
        <Grid.Column stretched width='2'>
          { this._usersLabel() }
        </Grid.Column>
        <Grid.Column stretched width='7'>
          <Input name='search' placeholder='Search...' fluid icon='search' value={this.state.search} onChange={(e) => this._handleSearchChange(e)}/>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <AdminUserList page={this.state.page} search={this.state.searchToPass} />
        </Grid.Column>
      </Grid.Row>
    </Grid>)
  }

  _pageMenu() {
    const items = _.times(this.state.pages, (i) => (
      <Menu.Item name={`${i+1}`} key={`page${i}`} active={i == this.state.page} onClick={() => this._handlePageClick(i)} content={`${i+1}`}/>
    ));

    return <Menu pagination>{ items }</Menu>;
  }

  _usersLabel() {
    return <Label color='green' icon='users' size='large' content={this.state.users} />;
  }

  _handleSearchChange(e) {
    this.setState({ search: e.target.value })
    this._updateSearchToPass();
  }

  _handlePageClick(page) {
    this.setState({ page });
  }
}
