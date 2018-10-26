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
import { toTitleCase } from '../../../../utils/transformationHelpers';
import CombinedIcon from '../../../atoms/CombinedIcon';

const TYPE_DEFAULT = 'send_one';
const TYPES = ['send_one', 'send_many', 'broadcast'];
const DIRECTION_IN = 'in';

const SendToManyIcon = ({ color }) => (
  <CombinedIcon color={color || 'var(--green)'}>
    <FaLongArrowAltRight />
    <FaLongArrowAltRight />
  </CombinedIcon>
);

const FromManyIcon = ({ color }) => (
  <CombinedIcon color={color || 'var(--green)'}>
    <FaLongArrowAltLeft />
    <FaLongArrowAltLeft />
  </CombinedIcon>
);

const TypeTableCell = ({ value, showDesc, direction }) => {
  const getData = () => {
    const desc = typeof value === 'string' && toTitleCase(value, '_');

    if (!TYPES.includes(value)) {
      return {
        desc,
        icon: <FaAsterisk color="var(--gray)" />,
      };
    }
    if (value === 'broadcast') {
      return {
        desc,
        icon: <FaBullhorn color="var(--light-blue)" />,
      };
    }

    if (!direction) {
      return {
        icon:
          value === TYPE_DEFAULT ? (
            <FaLongArrowAltRight color="var(--green)" />
          ) : (
            <SendToManyIcon color="var(--green)" />
          ),
        desc,
      };
    }

    if (direction === DIRECTION_IN) {
      return {
        desc,
        icon:
          value === TYPE_DEFAULT ? (
            <FaLongArrowAltLeft color="var(--green)" />
          ) : (
            <FromManyIcon color="var(--green)" />
          ),
      };
    }

    return {
      icon:
        value === TYPE_DEFAULT ? (
          <FaLongArrowAltRight color="var(--red)" />
        ) : (
          <SendToManyIcon color="var(--red)" />
        ),
      desc,
    };
  };

  const { icon, desc } = getData();

  return (
    <IconTableCell title={showDesc ? '' : desc}>
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

SendToManyIcon.propTypes = {
  color: PropTypes.string,
};

FromManyIcon.propTypes = {
  color: PropTypes.string,
};

export default TypeTableCell;
