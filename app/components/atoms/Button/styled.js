import styled from 'styled-components';

export default styled.button`
  padding: ${props => props.padding || `calc(var(--spacing-factor) * 3)`};
  color: ${props => props.color || `var(--white)`};
  background-color: ${props => props.bgcolor || `var(--blue)`};
  border: 1px solid ${props => props.bgcolor || `var(--blue)`};

  &:hover,
  &:focus {
    opacity: 0.8;
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
  }
`;
