/**
 *
 * StatusTableCell
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FaTrash, FaTrophy, FaStar, FaShieldAlt } from 'react-icons/fa';
import { IconCellDescription } from '../TableElements';

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
        title = 'normal';
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
        icon = <FaTrash />;
        break;
      case 2:
        icon = <FaStar />;
        break;
      case 6:
        icon = <FaTrophy />;
        break;

      default:
        icon = <FaShieldAlt />;
        break;
    }
    return icon;
  };
  const icon = getIcon();
  const title = getTitle();

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

StatusTableCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  showDesc: PropTypes.bool,
};

export default StatusTableCell;
