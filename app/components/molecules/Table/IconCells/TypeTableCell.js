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
} from 'react-icons/fa';
import { IconCellDescription, IconTableCell } from '../TableElements';
import CombinedIcon from '../../../atoms/CombinedIcon';
const TYPE_DEFAULT = 'send_one';
const DIRECTION_OUT = 'out';

const SendToManyIcon = () => (
  <CombinedIcon reversed>
    <FaLongArrowAltRight />
    <FaLongArrowAltRight />
    <FaLongArrowAltRight />
  </CombinedIcon>
);
const FromManyIcon = () => (
  <CombinedIcon>
    <FaLongArrowAltLeft />
    <FaLongArrowAltLeft />
    <FaLongArrowAltLeft />
  </CombinedIcon>
);

const TypeTableCell = ({ value, showDesc, direction }) => {
  const getIcon = () => {
    if (value === 'broadcast') {
      return <FaBullhorn color="var(--light-blue)" />;
    } else if (direction && direction === DIRECTION_OUT) {
      return value === TYPE_DEFAULT ? <FaLongArrowAltLeft /> : <FromManyIcon />;
    }
    return value === TYPE_DEFAULT ? (
      <FaLongArrowAltRight />
    ) : (
      <SendToManyIcon />
    );
  };

  const icon = getIcon();
  const title = typeof value === 'string' && value.replace('_', ' ');

  return (
    <IconTableCell title={title} color="var(--green)">
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
