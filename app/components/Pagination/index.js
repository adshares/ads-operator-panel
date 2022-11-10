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
import formatNumber from '../../lib/formatNumber';

/* eslint-disable react/prefer-stateless-function */
class Pagination extends React.PureComponent {
  renderFirstButton() {
    const label = this.context.intl.formatMessage(messages.first);
    const page = 1;

    return (
      <Item
        disabled={this.props.page === page}
        label={label}
        page={page}
        link={this.generateLink(page)}
      />
    );
  }

  renderLastButton(lastPage) {
    const label = this.context.intl.formatMessage(messages.last);
    const page = lastPage;

    return (
      <Item
        disabled={this.props.page === lastPage}
        label={label}
        page={page}
        link={this.generateLink(page)}
      />
    );
  }

  renderPreviousButton(batch = 1) {
    const label = this.context.intl.formatMessage(
      batch > 1 ? messages.previousBatch : messages.previous,
    );
    const page = this.props.page - batch;

    return (
      <Item
        disabled={page < 1}
        label={label}
        page={page}
        link={this.generateLink(page)}
      />
    );
  }

  renderNextButton(lastPage, batch = 1) {
    const label = this.context.intl.formatMessage(
      batch > 1 ? messages.nextBatch : messages.next,
    );
    const page = this.props.page + batch;

    return (
      <Item
        disabled={page > lastPage}
        label={label}
        page={page}
        link={this.generateLink(page)}
      />
    );
  }

  renderCurrentButton(lastPage) {
    const page = formatNumber(this.props.page);
    const total = formatNumber(lastPage);
    const label = this.context.intl.formatMessage(messages.current, {
      page,
      total,
    });
    return <Item label={label} active />;
  }

  generateLink(page) {
    return `${this.props.link}?page=${page}&sort=${this.props.sort}&order=${
      this.props.order
    }`;
  }

  render() {
    const lastPage = Math.max(
      1,
      Math.ceil(this.props.count / this.props.limit),
    );
    return (
      <PaginationWrapper aria-label="Nodes Pagination area">
        <ul className="pagination justify-content-center flex-wrap">
          {this.renderFirstButton()}
          {this.renderPreviousButton(10)}
          {this.renderPreviousButton()}
          {this.renderCurrentButton(lastPage)}
          {this.renderNextButton(lastPage)}
          {this.renderNextButton(lastPage, 10)}
          {this.renderLastButton(lastPage)}
        </ul>
      </PaginationWrapper>
    );
  }
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  sort: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
};

Pagination.contextTypes = {
  intl: intlShape,
};

export default Pagination;
