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
const DIRECTION_IN = 'in';

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
    const desc = typeof value === 'string' && value.split('_').join(' ');

    if (!TYPES.includes(value)) {
      return {
        desc,
        icon: <FaAsterisk />,
        color: 'var(--gray)',
      };
    }
    if (value === 'broadcast') {
      return {
        desc,
        color: 'var(--light-blue)',
        icon: <FaBullhorn />,
      };
    }
    if (direction && direction === DIRECTION_IN) {
      return {
        desc,
        color: 'var(--green)',
        icon:
          value === TYPE_DEFAULT ? <FaLongArrowAltLeft /> : <FromManyIcon />,
      };
    }

    return {
      icon:
        value === TYPE_DEFAULT ? <FaLongArrowAltRight /> : <SendToManyIcon />,
      desc,
      color: 'var(--green)',
    };
  };

  const { icon, desc, color } = getData();

  return (
    <IconTableCell title={showDesc ? '' : desc} color={color}>
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
