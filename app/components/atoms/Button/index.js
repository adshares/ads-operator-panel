import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from './styled';

const Button = props => (
  <StyledButton
    onClick={props.click}
    type={props.type}
    role={props.role}
    padding={props.padding}
    bgcolor={props.bgcolor}
    color={props.color}
  >
    {props.children}
  </StyledButton>
);

Button.propTypes = {
  click: PropTypes.func,
  type: PropTypes.string,
  role: PropTypes.string,
  padding: PropTypes.string,
  bgcolor: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.element,
};

export default Button;
