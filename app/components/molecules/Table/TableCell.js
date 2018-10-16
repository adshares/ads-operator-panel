/**
 *
 * TableDataSet
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  FaClone,
  FaSquare,
  FaTrash,
  FaTrophy,
  FaStar,
  FaShieldAlt,
  FaSignInAlt,
  FaSignOutAlt,
} from 'react-icons/fa';
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

  showTitle = () => {
    if (
      this.props.columnName !== 'time' &&
      this.props.columnName !== 'type' &&
      this.props.columnName !== 'status'
    ) {
      return '';
    } else if (this.props.columnName === 'status') {
      let title;
      switch (this.props.value) {
        case 0:
          title = 'normal';
          break;
        case 1:
          title = 'deleted';
          break;
        case 2:
          title = 'vip';
          break;
        default:
          title = 'super vip';
          break;
      }
      return title;
    }
    return this.props.value.replace('_', ' ');
  };

  formattedValue = () => {
    if (this.props.columnName === 'time') {
      return moment(this.props.value).fromNow();
    } else if (this.props.columnName === 'type') {
      return this.props.value === 'send_one' ? <FaSquare /> : <FaClone />;
    } else if (this.props.columnName === 'status') {
      let icon;
      switch (this.props.value) {
        case 0:
          icon = <FaShieldAlt />;
          break;
        case 1:
          icon = <FaTrash />;
          break;
        case 2:
          icon = <FaStar />;
          break;
        default:
          icon = <FaTrophy />;
          break;
      }
      return icon;
    } else if (this.props.columnName === 'direction') {
      return this.props.value === 'in' ? <FaSignInAlt /> : <FaSignOutAlt />;
    }
    return this.props.value;
  };

  constructor(props) {
    super(props);
    this.state = {
      ellipsisClass: '',
      formattedValue: this.formattedValue(),
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
    const { columnName } = this.props;
    const { formattedValue } = this.state;
    const classes = `${columnName} ${this.state.ellipsisClass}`;
    return (
      <TableCellStyled
        className={this.props.columnName}
        title={this.showTitle()}
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
