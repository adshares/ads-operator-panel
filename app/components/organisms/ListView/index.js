/**
 *
 * ListView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlShape } from 'react-intl';
import queryString from 'query-string';
import config from 'config';
import Pagination from 'components/Pagination/Loadable';
import ErrorMsg from 'components/molecules/ErrorMsg';
import { ListViewWrapper } from './styled';
import listViewMessages from './messages';
import TableDataSet from '../TableDataSet/index';

/* eslint-disable react/prefer-stateless-function */
class ListView extends React.PureComponent {
  componentDidMount() {
    const parsedQuery = queryString.parse(this.props.query);

    const sort = parsedQuery.sort || this.props.defaultSort;
    const order = parsedQuery.order || this.props.defaultOrder;

    if (
      this.props.sortingColumns.includes(sort) &&
      ['desc', 'asc'].includes(order)
    ) {
      const page = parsedQuery.page || 1;
      const { id } = this.props.urlParams;

      if (id) {
        this.props.onPageChange(id, page, sort, order);

        return;
      }

      this.props.onPageChange(page, sort, order);
    }
  }

  componentDidUpdate(nextProps) {
    const params = queryString.parse(nextProps.query);
    const paramsFromProps = queryString.parse(this.props.query);

    if (
      paramsFromProps.page !== params.page ||
      paramsFromProps.sort !== params.sort ||
      paramsFromProps.order !== params.order
    ) {
      const { id } = this.props.urlParams;

      if (id) {
        this.props.onPageChange(
          id,
          paramsFromProps.page || 1,
          paramsFromProps.sort,
          paramsFromProps.order,
        );

        return;
      }

      this.props.onPageChange(
        paramsFromProps.page || 1,
        paramsFromProps.sort,
        paramsFromProps.order,
      );
    }
  }

  render() {
    const parsedQuery = queryString.parse(this.props.query);
    const ceilConfiguration = this.props.ceilConfiguration || {
      id: value => <Link to={`${this.props.link}/${value}`}>{value}</Link>,
    };
    const headerConfiguration = this.props.headerConfiguration || {};

    const page = parseInt(parsedQuery.page || 1, 10);
    const sort = parsedQuery.sort || this.props.defaultSort;
    const order = parsedQuery.order || this.props.defaultOrder;
    const {
      sortingColumns,
      name,
      columns,
      link,
      list,
      tableMinWidth,
      breakpoint,
    } = this.props;
    if (!sortingColumns.includes(sort)) {
      return (
        <ErrorMsg
          error={this.context.intl.formatMessage(listViewMessages.sorting)}
        />
      );
    }

    if (order !== 'desc' && order !== 'asc') {
      return (
        <ErrorMsg
          error={this.context.intl.formatMessage(listViewMessages.ordering)}
        />
      );
    }
    return (
      <ListViewWrapper>
        <TableDataSet
          name={name}
          columns={columns}
          link={link}
          sortingColumns={sortingColumns}
          sortBy={sort}
          orderBy={order}
          ceilConfiguration={ceilConfiguration}
          headerConfiguration={headerConfiguration}
          data={
            list.data.length > config.limit ? list.data.slice(0, -1) : list.data
          }
          loading={list.loading}
          error={list.error}
          tableMinWidth={tableMinWidth}
          breakpoint={breakpoint}
        />
        <Pagination
          link={link}
          page={page}
          sort={sort}
          order={order}
          nextPage={list.data.length > config.limit}
        />
      </ListViewWrapper>
    );
  }
}

ListView.propTypes = {
  name: PropTypes.string.isRequired,
  urlParams: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  list: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
  sortingColumns: PropTypes.array.isRequired,
  ceilConfiguration: PropTypes.object,
  headerConfiguration: PropTypes.object,
  defaultSort: PropTypes.string,
  defaultOrder: PropTypes.string,
  link: PropTypes.string.isRequired,
  onPageChange: PropTypes.func,
  tableMinWidth: PropTypes.string,
  breakpoint: PropTypes.object.isRequired,
};

ListView.defaultProps = {
  defaultSort: 'id',
  defaultOrder: 'desc',
  ceilConfiguration: null,
  headerConfiguration: null,
};

ListView.contextTypes = {
  intl: intlShape,
};

export default ListView;
