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
const TYPES = ['send_one', 'send_many', 'broadcast', 'dividend'];
const DIRECTION_IN = 'in';

const SendToManyIcon = ({ iconColor }) => (
  <CombinedIcon color={iconColor || 'var(--green)'}>
    <FaLongArrowAltRight />
    <FaLongArrowAltRight />
  </CombinedIcon>
);

const FromManyIcon = ({ iconColor }) => (
  <CombinedIcon color={iconColor || 'var(--green)'}>
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
      let icon;
      if (value === TYPE_DEFAULT) {
        icon = <FaLongArrowAltRight color="var(--green)" />;
      } else if (value === 'dividend') {
        icon = <FaAsterisk color="var(--blue)" />;
      } else {
        icon = <SendToManyIcon iconColor="var(--green)" />;
      }
      return {
        icon,
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
            <FromManyIcon iconColor="var(--green)" />
          ),
      };
    }

    return {
      icon:
        value === TYPE_DEFAULT ? (
          <FaLongArrowAltRight color="var(--red)" />
        ) : (
          <SendToManyIcon iconColor="var(--red)" />
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
  iconColor: PropTypes.string.isRequired,
};

FromManyIcon.propTypes = {
  iconColor: PropTypes.string.isRequired,
};

export default TypeTableCell;
