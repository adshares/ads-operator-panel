/**
 *
 * TableDataSet
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingIndicator from 'components/LoadingIndicator';
import ErrorMsg from 'components/ErrorMsg';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import {
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Table,
  TableNoData,
} from '../../molecules/Table/TableElements';
import { ScrollableWrapper } from '../../atoms/ScrollableWrapper';

/* eslint-disable react/prefer-stateless-function */
class TableDataSet extends React.PureComponent {
  renderHeader() {
    const headers = [];
    Object.entries(this.props.columns).forEach(([columnId, columnName]) => {
      headers.push(this.renderColumnHeader(columnId, columnName));
    });

    return (
      <thead>
        <tr>{headers}</tr>
      </thead>
    );
  }

  renderColumnHeader(columnId, columnName) {
    if (
      this.props.sortingColumns.length > 0 &&
      this.props.sortingColumns.lastIndexOf(columnId) !== -1
    ) {
      const order =
        columnId === this.props.sortBy
          ? TableDataSet.reverseOrder(this.props.orderBy)
          : this.props.orderBy;

      const link = `${this.props.link}?page=1&sort=${columnId}&order=${order}`;

      return (
        <TableHeader scope="col" key={`${this.props.name}_${columnId}`}>
          <Link to={link}>
            {columnName}
            {columnId === this.props.sortBy ? TableDataSet.sortIcon(order) : ''}
          </Link>
        </TableHeader>
      );
    }

    return (
      <TableHeader scope="col" key={`${this.props.name}_${columnId}`}>
        {columnName}
      </TableHeader>
    );
  }

  static reverseOrder(order) {
    if (order === 'desc') {
      return 'asc';
    }

    return 'desc';
  }

  static sortIcon(order) {
    if (order === 'desc') {
      return <FaSortUp />;
    }

    return <FaSortDown />;
  }

  renderRows() {
    return this.props.data.map(row => this.renderSingleRow(row));
  }

  renderSingleRow(row) {
    const cells = [];
    Object.entries(this.props.columns).forEach(([columnHeader]) => {
      const value = row[columnHeader] !== undefined ? row[columnHeader] : '--';
      cells.push(this.renderCell(columnHeader, value, row));
    });

    return <TableRow key={`row_${row.id}`}>{cells}</TableRow>;
  }

  renderCell(columnName, value, row) {
    if (
      this.props.ceilConfiguration &&
      typeof this.props.ceilConfiguration[columnName] === 'function'
    ) {
      return (
        <TableCell
          key={`${row.id}_${columnName}_${value.toString()}`}
          className={columnName}
        >
          {this.props.ceilConfiguration[columnName](value, row)}
        </TableCell>
      );
    }
    return (
      <TableCell
        key={`${row.id}_${columnName}_${value.toString()}`}
        className={columnName}
      >
        {value}
      </TableCell>
    );
  }

  render() {
    if (this.props.error) {
      return <ErrorMsg error={this.props.error} />;
    }

    if (this.props.loading) {
      return <LoadingIndicator />;
    }

    if (this.props.data.length === 0) {
      const message = this.props.messageNoData || 'No data to display';
      return (
        <TableNoData>
          <strong>{message}</strong>
        </TableNoData>
      );
    }

    return (
      <ScrollableWrapper>
        <Table>
          {this.renderHeader()}
          <TableBody>{this.renderRows()}</TableBody>
        </Table>
      </ScrollableWrapper>
    );
  }
}

TableDataSet.propTypes = {
  name: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  columns: PropTypes.object.isRequired,
  sortingColumns: PropTypes.array,
  ceilConfiguration: PropTypes.object,
  sortBy: PropTypes.string,
  orderBy: PropTypes.string,
  link: PropTypes.string,
  data: PropTypes.array.isRequired,
  messageNoData: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

TableDataSet.defaultProps = {
  sortingColumns: [],
  ceilConfiguration: {},
  sortBy: 'id',
  orderBy: 'desc',
  link: '',
};

export default TableDataSet;
