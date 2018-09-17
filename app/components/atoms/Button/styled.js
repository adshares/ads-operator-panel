import styled from 'styled-components';

export const StyledButton = styled.button`
  padding: ${props => props.padding || `calc(var(--spacing-factor) * 3)`};
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

StyledButton.displayName = 'StyledButton';
export default StyledButton;
