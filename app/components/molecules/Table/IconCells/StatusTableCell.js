/* eslint-disable no-bitwise */
/**
 *
 * StatusTableCell
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaTrophy, FaStar, FaShieldAlt } from 'react-icons/fa';
import {
  IconCellDescription,
  IconTableCell,
  IconTableCellWrapper,
} from '../TableElements';

const StatusTableCell = ({ value, showDesc }) => {
  const getData = () => {
    let desc;
    let icon;
    if (value & 1) {
      desc = `Deleted [${value}]`;
      icon = <FaTimes color="var(--red)" />;
    } else if (value & 4) {
      desc = `Super VIP [${value}]`;
      icon = <FaTrophy color="var(--yellow)" />;
    } else if (value & 2) {
      desc = `VIP [${value}]`;
      icon = <FaStar color="var(--yellow)" />;
    } else {
      desc = `Normal [${value}]`;
      icon = <FaShieldAlt />;
    }

    return {
      desc,
      icon,
    };
  };

  const { icon, desc } = getData();
  return (
    <IconTableCell title={desc}>
      <IconTableCellWrapper>
        {icon}
        {showDesc && <IconCellDescription>{desc}</IconCellDescription>}
      </IconTableCellWrapper>
    </IconTableCell>
  );
};

StatusTableCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  showDesc: PropTypes.bool,
};

export default StatusTableCell;
