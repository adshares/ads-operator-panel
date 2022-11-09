/* eslint-disable no-bitwise */
/**
 *
 * StatusTableCell
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  FaTimes,
  FaTrophy,
  FaStar,
  FaShieldAlt,
  FaExchangeAlt,
  FaFire,
} from 'react-icons/fa';
import { IconCellDescription, IconTableCell } from '../TableElements';
import config from '../../../../config';

const StatusTableCell = ({ value, id, showDesc }) => {
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

  const getExtraData = () => {
    let xDesc;
    let xIcon;

    if (config.accounts.technical[id]) {
      xDesc = config.accounts.technical[id];
      xIcon = <FaFire color="var(--red)" />;
    } else if (config.accounts.exchanges[id]) {
      xDesc = config.accounts.exchanges[id];
      xIcon = <FaExchangeAlt color="var(--green)" />;
    }

    return {
      xDesc,
      xIcon,
    };
  };

  const { icon, desc } = getData();
  const { xIcon, xDesc } = getExtraData();
  return (
    <IconTableCell>
      <span title={desc}>
        {showDesc ? (
          <span>
            {icon} <IconCellDescription>{desc}</IconCellDescription>
          </span>
        ) : (
          icon
        )}
      </span>
      {xIcon ? (
        <span title={xDesc}>
          &nbsp;
          {showDesc ? (
            <span>
              {xIcon} <IconCellDescription>{xDesc}</IconCellDescription>
            </span>
          ) : (
            xIcon
          )}
        </span>
      ) : (
        ''
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
  id: PropTypes.string,
  showDesc: PropTypes.bool,
};

export default StatusTableCell;
