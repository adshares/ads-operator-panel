/**
 *
 * ErrorMsg
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FaExclamationTriangle } from 'react-icons/fa/index';
import { InfoSection } from '../../atoms/InfoSection';
import { palette } from '../../../styleUtils/variables';

const ErrorMsg = props => {
  const msg =
    typeof props.error === 'object' ? props.error.message : props.error;

  return (
    <InfoSection color={palette.red}>
      <FaExclamationTriangle />
      <h1 className="message">{msg}</h1>
    </InfoSection>
  );
};

ErrorMsg.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default ErrorMsg;
