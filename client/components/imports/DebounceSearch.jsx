import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import { debounce } from 'lodash';

class DebounceSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };

    const { delay, onSearch } = props;

    this._debounceUpdate = debounce(() => {
      onSearch(this.state.search);
    }, (delay || 500));
  }

  render() {
    const { delay, onSearch, ...otherProps } = this.props;

    return (
      <Input
        name='search'
        {...otherProps}
        value={this.state.search}
        onChange={(e) => this._searchUpdated(e)}
        />
    );
  }

  _searchUpdated(e) {
    this.setState({ search: e.target.value });
    this._debounceUpdate();
  }
}

DebounceSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
  delay: PropTypes.number,
};

export default DebounceSearch;