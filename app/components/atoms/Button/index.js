/**
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react';
import PropTypes from 'prop-types';
import Btn from './styled';

const Button = props => (
  <Btn
    onClick={props.click}
    type={props.type}
    role={props.role}
    padding={props.padding}
    background={props.background}
    color={props.color}
  />
);

// We require the use of src and alt, only enforced by react in dev mode
Button.propTypes = {
  click: PropTypes.func,
  type: PropTypes.string,
  role: PropTypes.string,
  padding: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
};

export default Button;
