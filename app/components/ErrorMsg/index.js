/**
 *
 * ErrorMsg
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorDiv = styled.div`
  font-weight: bold;
  color: red;
  text-align: center;
`;

/* eslint-disable react/prefer-stateless-function */
class ErrorMsg extends React.PureComponent {
  render() {
    const msg =
      typeof this.props.error === 'object'
        ? this.props.error.message
        : this.props.error;

    return <ErrorDiv>{msg}</ErrorDiv>;
  }
}

ErrorMsg.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default ErrorMsg;
