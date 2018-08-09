/**
 *
 * Pagination Item
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
class Item extends React.PureComponent {
  renderElement(label) {
    if (!this.props.page || !this.props.link) {
      return <span className="page-link">{label}</span>;
    }

    return (
      <Link className="page-link" to={this.props.link}>
        {label}
      </Link>
    );
  }

  render() {
    const label = this.props.label ? this.props.label : this.props.page;
    if (!label) {
      return <li />;
    }

    let itemClassName = this.props.active ? 'page-item active' : 'page-item';

    if (this.props.disabled === true) {
      itemClassName += ' disabled';
    }

    return <li className={itemClassName}>{this.renderElement(label)}</li>;
  }
}

Item.propTypes = {
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  page: PropTypes.number,
  link: PropTypes.string,
  label: PropTypes.string,
};

Item.defaultProps = {
  disabled: false,
  active: false,
};

export default Item;
