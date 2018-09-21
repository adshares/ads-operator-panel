/**
 *
 * Search
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import { SearchWrapper } from './styled';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input';
import Form from '../../atoms/Form';
import { palette } from '../../../styleUtils/variables';

/* eslint-disable react/prefer-stateless-function */
class Search extends React.PureComponent {
  onInput = event =>
    this.setState({
      value: event.target.value,
    });

  handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    const value = this.state.value.toUpperCase();

    Object.entries(this.urlMap).forEach(([regex, url]) => {
      const matched = value.match(new RegExp(regex, 'i'));
      if (matched) {
        this.props.history.push(url + matched[0]);
      }
    });

    this.setState({
      value: '',
    });
  };

  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.urlMap = {
      '^[0-9A-F]{4}-[0-9A-F]{8}-[0-9A-F]{4}$': '/blockexplorer/accounts/',
      '^[0-9A-F]{4}$': '/blockexplorer/nodes/',
      '^[0-9A-F]{8}$': '/blockexplorer/blocks/',
      '^[0-9A-F]{4}:[0-9A-F]{8}:[0-9A-F]{4}$': '/blockexplorer/transactions/',
      '^[0-9A-F]{4}:[0-9A-F]{8}$': '/blockexplorer/messages/',
    };
  }

  render() {
    return (
      <SearchWrapper>
        <Form onSubmit={this.handleSubmit} width="100%">
          <Input
            type="text"
            name="search"
            id="search"
            placeholder="SEARCH"
            focused={palette.darkblue}
            width="100%"
            onChange={this.onInput}
            value={this.state.value}
          />
          <Button color={palette.white} type="submit">
            <FaSearch />
          </Button>
        </Form>
      </SearchWrapper>
    );
  }
}

Search.propTypes = {
  history: PropTypes.object,
};

export default Search;
