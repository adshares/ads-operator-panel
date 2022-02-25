/* eslint-disable no-bitwise */
/**
 *
 * StatusTableCell
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TransactionIdCell = ({ value, direction, amount }) => {
  if (value.indexOf('dividend') > -1) {
    let label = null;
    let title = null;

    let localDirection = direction;
    let localAmount = amount;

    if (['in', 'out'].indexOf(direction) === -1) {
      localDirection = localAmount <= 0 ? 'out' : 'in';
      localAmount = Math.abs(localAmount);
    }

    if (localDirection === 'out') {
      if (localAmount > 0.0002) {
        label = 'dormancy fee';
        title =
          'Last outgoing transaction was more than 2 years ago. Inactivity fee is 0.1% per dividend period (2048 blocks ~ 12 days).';
      } else if (localAmount === 0.0002) {
        label = 'inactivity fee';
        title =
          'Last outgoing transaction was more than 1 year ago. Maintenance fee is taken every dividend period (2048 blocks ~ 12 days)';
      } else if (localAmount >= 0) {
        label = 'maintenance fee';
        title =
          'Staking reward did not cover maintenance fee taken every dividend period (2048 blocks ~ 12 days)';
      }
    } else if (localDirection === 'in') {
      label = 'staking reward';
      title =
        'Reward size depends on network activity and account balance. Dividend period is 2048 blocks (~ 12 days).';
    }
    return <span title={title}>{label}</span>;
  }
  return <Link to={`/blockexplorer/transactions/${value}`}>{value}</Link>;
};

TransactionIdCell.propTypes = {
  value: PropTypes.string,
  direction: PropTypes.string,
  amount: PropTypes.number,
};

export default TransactionIdCell;
