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
  FaCoins,
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

const TypeTableCell = ({ value, showDesc, direction, amount }) => {
  const getData = () => {
    const desc = typeof value === 'string' && toTitleCase(value, '_');
    let localDirection = direction;

    if (!TYPES.includes(value)) {
      return {
        icon: <FaAsterisk color="var(--gray)" />,
        desc,
      };
    }
    if (value === 'broadcast') {
      return {
        icon: <FaBullhorn color="var(--light-blue)" />,
        desc,
      };
    }

    if (value === 'dividend' && !localDirection && amount) {
      localDirection = amount < 0 ? 'out' : 'in';
    }

    if (!localDirection) {
      let icon;
      if (value === TYPE_DEFAULT) {
        icon = <FaLongArrowAltRight color="var(--green)" />;
      } else if (value === 'dividend') {
        icon = <FaCoins />;
      } else {
        icon = <SendToManyIcon iconColor="var(--green)" />;
      }
      return {
        icon,
        desc,
      };
    }

    if (localDirection === DIRECTION_IN) {
      let icon;
      if (value === TYPE_DEFAULT) {
        icon = <FaLongArrowAltLeft color="var(--green)" />;
      } else if (value === 'dividend') {
        icon = <FaCoins color="var(--green)" />;
      } else {
        icon = <FromManyIcon iconColor="var(--green)" />;
      }
      return {
        icon,
        desc,
      };
    }

    let icon;
    if (value === TYPE_DEFAULT) {
      icon = <FaLongArrowAltRight color="var(--red)" />;
    } else if (value === 'dividend') {
      icon = <FaCoins color="var(--red)" />;
    } else {
      icon = <SendToManyIcon iconColor="var(--red)" />;
    }
    return {
      icon,
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
  amount: PropTypes.oneOf(PropTypes.string, PropTypes.number),
};

SendToManyIcon.propTypes = {
  iconColor: PropTypes.string.isRequired,
};

FromManyIcon.propTypes = {
  iconColor: PropTypes.string.isRequired,
};

export default TypeTableCell;
