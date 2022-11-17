/* eslint-disable no-bitwise */
/**
 *
 * StatusTableCell
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import fa from 'react-icons/fa';
import { IconCellDescription, IconTableCell } from '../TableElements';

const LabelTableCell = ({ value, icon, showDesc }) => {
  const FaIcon = icon ? fa[icon] : null;
  let color = 'var(--green)';
  if (icon === 'FaFire') {
    color = 'var(--red)';
  }
  return (
    <IconTableCell>
      <span title={value}>
        {FaIcon && <FaIcon color={color} />}
        {showDesc && <IconCellDescription>{value}</IconCellDescription>}
      </span>
    </IconTableCell>
  );
};

LabelTableCell.propTypes = {
  value: PropTypes.string,
  icon: PropTypes.string,
  showDesc: PropTypes.bool,
};

export default LabelTableCell;
