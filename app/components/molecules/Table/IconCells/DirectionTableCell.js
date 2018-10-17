/**
 *
 * DirectionTableCell
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
const TYPE_DEFAULT = 'in';

const DirectionTableCell = ({ value }) => {
  const icon = value === TYPE_DEFAULT ? <FaSignInAlt /> : <FaSignOutAlt />;
  const title = value.replace('_', ' ');

  return <div title={title}>{icon}</div>;
};

DirectionTableCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
};

export default DirectionTableCell;
