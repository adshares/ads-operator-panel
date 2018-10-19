/* eslint-disable no-bitwise */
/**
 *
 * StatusTableCell
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaTrophy, FaStar, FaShieldAlt } from 'react-icons/fa';
import { IconCellDescription, IconTableCell } from '../TableElements';

const StatusTableCell = ({ value, showDesc }) => {
  const getData = () => {
    let desc;
    let icon;
    if (value & 1) {
      desc = 'deleted';
      icon = <FaTimes color="var(--red)" />;
    } else if (value & 4) {
      desc = 'super vip';
      icon = <FaTrophy color="var(--yellow)" />;
    } else if (value & 2) {
      desc = 'vip';
      icon = <FaStar color="var(--yellow)" />;
    } else {
      desc = 'normal';
      icon = <FaShieldAlt />;
    }
    return {
      desc,
      icon,
    };
  };

  const { icon, desc } = getData();
  console.log('---', desc);
  return (
    <IconTableCell title={desc}>
      {showDesc ? (
        <div>
          {icon} <IconCellDescription>{desc}</IconCellDescription>
        </div>
      ) : (
        icon
      )}
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
