/**
 *
 * Search
 *
 */

import React from 'react';

/* eslint-disable react/prefer-stateless-function */
class Search extends React.PureComponent {
  render() {
    return (
      <div>
        <form action="" className="search-form">
          <div className="form-group has-feedback">
            <input
              type="text"
              className="form-control"
              name="search"
              id="search"
              placeholder="search"
            />
            <span className="glyphicon glyphicon-search form-control-feedback" />
          </div>
        </form>
      </div>
    );
  }
}

Search.propTypes = {};

export default Search;
