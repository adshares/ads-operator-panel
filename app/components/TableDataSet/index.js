/**
 *
 * TableDataSet
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
class TableDataSet extends React.PureComponent {
  generateHeader() {
    const headers = [];
    Object.values(this.props.columns).forEach(column => {
      headers.push(
        <th scope="col" key={`${this.props.name}_${column}`}>
          {column}
        </th>,
      );
    });

    return (
      <thead>
        <tr>{headers}</tr>
      </thead>
    );
  }

  generateRows() {
    return this.props.data.map(row => this.generateSingleRow(row));
  }

  generateSingleRow(row) {
    const cells = [];
    Object.entries(row).forEach(([column, value]) => {
      if (Object.prototype.hasOwnProperty.call(this.props.columns, column)) {
        cells.push(
          <td key={`${row.id}_${column}_${value.toString()}`}>{value}</td>,
        );
      }
    });

    return <tr key={row.id}>{cells}</tr>;
  }

  render() {
    if (!this.props.data) {
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
          <tbody>{this.generateRows()}</tbody>
        </table>
      </div>
    );
  }
}

TableDataSet.propTypes = {
  name: PropTypes.string.isRequired,
  columns: PropTypes.object.isRequired,
  data: PropTypes.any,
  messageNoData: PropTypes.string,
};

export default TableDataSet;
