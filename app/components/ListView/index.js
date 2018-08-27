/**
 *
 * ListView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlShape } from 'react-intl';
import config from 'config';
import Pagination from 'components/Pagination/Loadable';
import TableDataSet from 'components/TableDataSet';
import ErrorMsg from 'components/ErrorMsg';
import { ListViewWrapper } from './styled';
import listViewMessages from './messages';

/* eslint-disable react/prefer-stateless-function */
class ListView extends React.PureComponent {
  componentDidMount() {
    const sort = this.props.urlParams.sort || this.props.defaultSort;
    const order = this.props.urlParams.order || this.props.defaultOrder;

    if (
      this.props.sortingColumns.includes(sort) &&
      ['desc', 'asc'].includes(order)
    ) {
      const page = this.props.urlParams.page || 1;
      const { id } = this.props.urlParams;

      if (id) {
        this.props.onPageChange(id, page, sort, order);

        return;
      }

      this.props.onPageChange(page, sort, order);
    }
  }

  componentDidUpdate(nextProps) {
    const params = nextProps.urlParams;
    const paramsFromProps = this.props.urlParams;

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
    const ceilConfiguration = {
      id: value => <Link to={`${this.props.link}/${value}`}>{value}</Link>,
    };

    const page = parseInt(this.props.urlParams.page || 1, 10);
    const sort = this.props.urlParams.sort || this.props.defaultSort;
    const order = this.props.urlParams.order || this.props.defaultOrder;

    if (!this.props.sortingColumns.includes(sort)) {
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
          name={this.props.name}
          columns={this.props.columns}
          link={this.props.link}
          sortingColumns={this.props.sortingColumns}
          sortBy={sort}
          orderBy={order}
          ceilConfiguration={ceilConfiguration}
          data={
            this.props.list.data.length > config.limit
              ? this.props.list.data.slice(0, -1)
              : this.props.list.data
          }
          loading={this.props.list.loading}
          error={this.props.list.error}
        />
        <Pagination
          link={this.props.link}
          page={page}
          sort={sort}
          order={order}
          nextPage={this.props.list.data.length > config.limit}
        />
      </ListViewWrapper>
    );
  }
}

ListView.propTypes = {
  name: PropTypes.string.isRequired,
  urlParams: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
  sortingColumns: PropTypes.array.isRequired,
  defaultSort: PropTypes.string,
  defaultOrder: PropTypes.string,
  link: PropTypes.string.isRequired,
  onPageChange: PropTypes.func,
};

ListView.defaultProps = {
  defaultSort: 'id',
  defaultOrder: 'desc',
};

ListView.contextTypes = {
  intl: intlShape,
};

export default ListView;
