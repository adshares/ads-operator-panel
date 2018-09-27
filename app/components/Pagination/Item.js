/* eslint-disable react/no-unused-prop-types */
/**
 *
 * Pagination Item
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { PaginationListElement } from './styled';

const Item = props => {
  const renderElement = label => {
    if (!props.page || !props.link) {
      return <span>{label}</span>;
    }

    return <Link to={props.link}>{label}</Link>;
  };

  const label = props.label ? props.label : props.page;

  if (!label) {
    return <li />;
  }

  return (
    <PaginationListElement active={props.active} disabled={props.disabled}>
      {renderElement(label)}
    </PaginationListElement>
  );
};

Item.propTypes = {
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  page: PropTypes.number,
  label: PropTypes.string,
  link: PropTypes.string,
};

Item.defaultProps = {
  disabled: false,
  active: false,
};

export default Item;
