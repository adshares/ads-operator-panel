import styled from 'styled-components';

export const Button = styled.button`
  padding: ${props => props.padding || `calc(var(--spacing-factor) * 2)`};
  color: ${props => props.color || `var(--white)`};
  background-color: ${props => props.bgcolor || `var(--dark-blue)`};
  border: 1px solid ${props => props.bgcolor || `var(--dark-blue)`};

  &:hover,
  &:focus {
    opacity: 0.8;
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

Button.displayName = 'Button';
export default Button;
