/**
 *
 * TableDataSet
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from 'components/LoadingIndicator';
import ErrorMsg from 'components/ErrorMsg';

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

  generateRowsFromData() {
    return this.props.data.map(row => this.generateSingleRow(row));
  }

  generateSingleRow(row) {
    const cells = [];
    Object.entries(this.props.columns).forEach(([columnHeader]) => {
      Object.entries(row).forEach(([rowColumnName, value]) => {
        if (rowColumnName === columnHeader) {
          cells.push(
            <td key={`${row.id}_${columnHeader}_${value.toString()}`}>
              {value}
            </td>,
          );
        }
      });
    });

    return <tr key={row.id}>{cells}</tr>;
  }

  generateTableContent() {
    if (this.props.loading === true) {
      return (
        <tr>
          <td>
            <LoadingIndicator />
          </td>
        </tr>
      );
    }

    if (this.props.error) {
      return (
        <tr>
          <td>
            <ErrorMsg error={this.props.error} />
          </td>
        </tr>
      );
    }

    return this.generateRowsFromData();
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
          <tbody>{this.generateTableContent()}</tbody>
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
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default TableDataSet;
