/**
 *
 * Search
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import { SearchWrapper } from './styled';

/* eslint-disable react/prefer-stateless-function */
class Search extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { value: '' };
    this.urlMap = {
      '^[0-9A-Z]{4}-[0-9A-Z]{8}-[0-9A-Z]{4}$': '/blockexplorer/accounts/',
      '^[0-9A-Z]{4}$': '/blockexplorer/nodes/',
      '^[0-9A-Z]{8}$': '/blockexplorer/blocks/',
      '^[0-9A-Z]{4}:[0-9A-Z]{8}:[0-9A-Z]{4}$': '/blockexplorer/transactions/',
      '^[0-9A-Z]{4}:[0-9A-Z]{8}$': '/blockexplorer/messages/',
    };
  }

  onInput = event =>
    this.setState({
      value: event.target.value,
    });

  handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    const { value } = this.state;

    Object.entries(this.urlMap).forEach(([regex, url]) => {
      const matched = value.match(new RegExp(regex, 'i'));
      if (matched) {
        this.props.history.push(url + matched[0]);
      }
    });
  };

  render() {
    return (
      <SearchWrapper>
        <form className="search-form" onSubmit={this.handleSubmit}>
          <div className="form-group search">
            <FaSearch />
            <input
              type="text"
              className="form-control"
              name="search"
              id="search"
              placeholder="search"
              onChange={this.onInput}
            />
          </div>
        </form>
      </SearchWrapper>
    );
  }
}

Search.propTypes = {
  history: PropTypes.object,
};

export default Search;
