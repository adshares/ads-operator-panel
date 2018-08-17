/**
 *
 * Pagination
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

import messages from './messages';
import { PaginationWrapper } from './styled';
import Item from './Item';

/* eslint-disable react/prefer-stateless-function */
class Pagination extends React.PureComponent {
  renderPreviousButton() {
    const label = this.context.intl.formatMessage(messages.previous);
    const page = this.props.page - 1;

    return (
      <Item
        disabled={this.props.page <= 1}
        label={label}
        page={page}
        link={this.generateLink(page)}
      />
    );
  }

  renderNextButton() {
    const label = this.context.intl.formatMessage(messages.next);
    const page = this.props.page + 1;

    return (
      <Item
        disabled={!this.props.nextPage}
        label={label}
        page={page}
        link={this.generateLink(page)}
      />
    );
  }

  renderPagesButton() {
    const pages = [];
    const beforeRangeLimit = Math.min(
      this.props.pageRangeDisplayed,
      this.props.page,
    );

    for (let i = 1; i <= beforeRangeLimit; i += 1) {
      pages.push(this.renderSinglePageButton(i, this.props.page === i));
    }

    if (beforeRangeLimit < this.props.page) {
      let marginPages = this.props.page - this.props.marginPagesDisplayed;
      if (marginPages <= beforeRangeLimit) {
        marginPages = beforeRangeLimit + 1;
      }

      pages.push(<Item key="page_dot" label="..." />);

      for (let i = marginPages; i <= this.props.page; i += 1) {
        pages.push(this.renderSinglePageButton(i, this.props.page === i));
      }
    }

    return pages;
  }

  renderSinglePageButton(page, active) {
    if (page === this.props.page) {
      return <Item key={`page_${page}`} page={page} active={active} />;
    }

    return (
      <Item
        key={`page_${page}`}
        active={active}
        page={page}
        link={this.generateLink(page)}
      />
    );
  }

  generateLink(page) {
    return `${this.props.link}/${page}/${this.props.sort}/${this.props.order}`;
  }

  render() {
    return (
      <PaginationWrapper aria-label="Nodes Pagination area">
        <ul className="pagination justify-content-center flex-wrap">
          {this.renderPreviousButton()}
          {this.renderPagesButton()}
          {this.renderNextButton()}
        </ul>
      </PaginationWrapper>
    );
  }
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  sort: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  nextPage: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  pageRangeDisplayed: PropTypes.number,
  marginPagesDisplayed: PropTypes.number,
};

Pagination.defaultProps = {
  pageRangeDisplayed: 15,
  marginPagesDisplayed: 5,
};

Pagination.contextTypes = {
  intl: intlShape,
};

export default Pagination;
