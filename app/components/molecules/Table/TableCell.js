/* eslint-disable react/no-did-mount-set-state,prettier/prettier */
/**
 *
 * TableDataSet
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TableCellStyled } from '../../molecules/Table/TableElements';

/* eslint-disable react/prefer-stateless-function */
class TableCell extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      ellipsisClass: '',
    };
  }
  componentDidMount() {
    this.setState({
      ellipsisClass:  this.isEllipsisActive() ? 'ellipsisActive' : ' ',
    });
  }

  isEllipsisActive = () => this.contentElement.offsetWidth < this.contentElement.scrollWidth;

  render() {
    const { columnName, value, row } = this.props;
    const classes = `${columnName} ${this.state.ellipsisClass}`;


    return (
      <TableCellStyled
        className={columnName}
        key={`${row.id}_${columnName}_${value.toString()}`}
      >
        <div
          className={classes}
          ref={el => {
            this.contentElement = el;
          }}
        >
          {value}
        </div>
      </TableCellStyled>
    );
  }
}

TableCell.propTypes = {
  columnName: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
  row: PropTypes.object,
};

export default TableCell;
