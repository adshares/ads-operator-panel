/**
 *
 * TableDataSet
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TableCellStyled } from './TableElements';

/* eslint-disable react/prefer-stateless-function */
class TableCell extends React.PureComponent {
  checkTextOverflow = () => {
    this.setState({
      ellipsisClass: this.isEllipsisActive() ? 'ellipsisActive' : '',
    });
  };

  isEllipsisActive = () =>
    this.contentElement.offsetWidth < this.contentElement.scrollWidth;

  constructor(props) {
    super(props);
    this.state = {
      ellipsisClass: '',
    };
  }

  componentDidMount() {
    this.checkTextOverflow();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.breakpoint.name !== this.props.breakpoint.name) {
      this.checkTextOverflow();
    }
  }

  render() {
    const { columnName, value } = this.props;
    const classes = `${columnName} ${this.state.ellipsisClass}`;
    return (
      <TableCellStyled className={columnName}>
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
  breakpoint: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
};

export default TableCell;
