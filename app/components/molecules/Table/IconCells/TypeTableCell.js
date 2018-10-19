/**
 *
 * TypeTableCell
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaBullhorn,
  FaAsterisk,
} from 'react-icons/fa';
import {
  IconCellDescription,
  IconTableCell,
  IconTableCellWrapper,
} from '../TableElements';
import CombinedIcon from '../../../atoms/CombinedIcon';
const TYPE_DEFAULT = 'send_one';
const TYPES = ['send_one', 'send_many', 'broadcast'];
const DIRECTION_OUT = 'out';

const SendToManyIcon = () => (
  <CombinedIcon>
    <FaLongArrowAltRight />
    <FaLongArrowAltRight />
  </CombinedIcon>
);

const FromManyIcon = () => (
  <CombinedIcon>
    <FaLongArrowAltLeft />
    <FaLongArrowAltLeft />
  </CombinedIcon>
);

const TypeTableCell = ({ value, showDesc, direction }) => {
  const getData = () => {
    let icon;
    const desc = typeof value === 'string' && value.replace('_', ' ');

    if (!TYPES.includes(value)) {
      return {
        desc: 'special',
        icon: <FaAsterisk />,
      };
    }
    if (value === 'broadcast') {
      icon = <FaBullhorn color="var(--light-blue)" />;
    } else if (direction && direction === DIRECTION_OUT) {
      icon = value === TYPE_DEFAULT ? <FaLongArrowAltLeft /> : <FromManyIcon />;
    } else {
      icon =
        value === TYPE_DEFAULT ? <FaLongArrowAltRight /> : <SendToManyIcon />;
    }
    return {
      icon,
      desc,
    };
  };

  const { icon, desc } = getData();

  return (
    <IconTableCell title={showDesc ? '' : desc} color="var(--green)">
      {showDesc ? (
        <IconTableCellWrapper>
          {icon} <IconCellDescription>{desc}</IconCellDescription>
        </IconTableCellWrapper>
      ) : (
        icon
      )}
    </IconTableCell>
  );
};

TypeTableCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  showDesc: PropTypes.bool,
  direction: PropTypes.string,
};

export default TypeTableCell;
