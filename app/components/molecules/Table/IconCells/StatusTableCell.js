/* eslint-disable no-bitwise */
/**
 *
 * StatusTableCell
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  FaAsterisk,
  FaTimes,
  FaTrophy,
  FaStar,
  FaShieldAlt,
} from 'react-icons/fa';
import { IconCellDescription, IconTableCell } from '../TableElements';

const StatusTableCell = ({ value, showDesc }) => {
  const getTitle = () => {
    let title;

    switch (value) {
      case 0:
        title = 'normal';
        break;
      case 1:
        title = 'deleted';
        break;
      case 2:
        title = 'vip';
        break;
      case 6:
        title = 'super vip';
        break;

      default:
        title = 'special';
        break;
    }
    return title;
  };

  const getIcon = () => {
    let icon;
    switch (value) {
      case 0:
        icon = <FaShieldAlt />;
        break;
      case 1:
        icon = <FaTimes color="var(--red)" />;
        break;
      case 2:
        icon = <FaStar color="var(--yellow)" />;
        break;
      case 6:
        icon = <FaTrophy color="var(--yellow)" />;
        break;

      default:
        icon = <FaAsterisk />;
        break;
    }
    return icon;
  };

  const icon = getIcon();
  const title = getTitle();

  return (
    <IconTableCell title={title}>
      {showDesc ? (
        <div>
          {icon} <IconCellDescription>{title}</IconCellDescription>
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
