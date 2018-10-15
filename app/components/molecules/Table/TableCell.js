/**
 *
 * TableDataSet
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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

  formattedValue = () => moment(this.props.value).fromNow();

  constructor(props) {
    super(props);
    this.state = {
      ellipsisClass: '',
      formattedValue:
        props.columnName !== 'time' ? props.value : this.formattedValue(),
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
    const { formattedValue } = this.state;
    const classes = `${columnName} ${this.state.ellipsisClass}`;

    return (
      <TableCellStyled
        className={this.props.columnName}
        title={columnName === 'time' ? value : ''}
      >
        <div
          className={classes}
          ref={el => {
            this.contentElement = el;
          }}
        >
          {formattedValue}
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
