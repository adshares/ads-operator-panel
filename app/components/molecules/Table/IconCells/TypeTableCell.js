/**
 *
 * TypeTableCell
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FaSquare, FaClone } from 'react-icons/fa';
import { IconCellDescription } from '../TableElements';
const TYPE_DEFAULT = 'send_one';

const TypeTableCell = ({ value, showDesc }) => {
  const icon = value === TYPE_DEFAULT ? <FaSquare /> : <FaClone />;
  const title = typeof value === 'string' && value.replace('_', ' ');

  return (
    <div title={title}>
      {showDesc ? (
        <div>
          {icon} <IconCellDescription>{title}</IconCellDescription>
        </div>
      ) : (
        icon
      )}
    </div>
  );
};

TypeTableCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  showDesc: PropTypes.bool,
};

export default TypeTableCell;
