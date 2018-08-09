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

/* eslint-disable react/prefer-stateless-function */
class TableDataSet extends React.PureComponent {
  generateHeader() {
    const headers = [];
    Object.entries(this.props.columns).forEach(([columnId, columnName]) => {
      headers.push(this.generateColumnHeader(columnId, columnName));
    });

    return (
      <thead>
        <tr>{headers}</tr>
      </thead>
    );
  }

  generateColumnHeader(columnId, columnName) {
    if (
      this.props.sortingColumns.length > 0 &&
      this.props.sortingColumns.lastIndexOf(columnId) !== -1
    ) {
      const order =
        columnId === this.props.sortBy
          ? TableDataSet.reverseOrder(this.props.orderBy)
          : this.props.orderBy;

      const link = `${this.props.link}/1/${columnId}/${order}`;

      return (
        <th scope="col" key={`${this.props.name}_${columnId}`}>
          <Link
            to={link}
            onClick={() => this.props.onChange(1, columnId, order)}
          >
            {columnName}
            {columnId === this.props.sortBy ? TableDataSet.sortIcon(order) : ''}
          </Link>
        </th>
      );
    }

    return (
      <th scope="col" key={`${this.props.name}_${columnId}`}>
        {columnName}
      </th>
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

  generateRowsFromData() {
    return this.props.data.map(row => this.generateSingleRow(row));
  }

  generateSingleRow(row) {
    const cells = [];
    Object.entries(this.props.columns).forEach(([columnHeader]) => {
      Object.entries(row).forEach(([rowColumnName, value]) => {
        if (rowColumnName === columnHeader) {
          cells.push(this.renderCeil(rowColumnName, value, row));
        }
      });
    });

    return <tr key={row.id}>{cells}</tr>;
  }

  renderCeil(columnName, value, row) {
    if (
      this.props.ceilConfiguration[columnName] !== undefined &&
      typeof this.props.ceilConfiguration[columnName] === 'function'
    ) {
      return (
        <td key={`${row.id}_${columnName}_${value.toString()}`}>
          {this.props.ceilConfiguration[columnName](value)}
        </td>
      );
    }

    return <td key={`${row.id}_${columnName}_${value.toString()}`}>{value}</td>;
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
        <div className="row">
          <strong>{message}</strong>
        </div>
      );
    }

    return (
      <div className="row">
        <table className="table">
          {this.generateHeader()}
          <tbody>{this.generateRowsFromData()}</tbody>
        </table>
      </div>
    );
  }
}

TableDataSet.propTypes = {
  name: PropTypes.string.isRequired,
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
  onChange: PropTypes.func,
};

TableDataSet.defaultProps = {
  sortingColumns: [],
  ceilConfiguration: {},
  sortBy: 'id',
  orderBy: 'desc',
  link: '',
};

export default TableDataSet;
