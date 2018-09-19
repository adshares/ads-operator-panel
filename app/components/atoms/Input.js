import styled from 'styled-components';

export const Input = styled.input`
  padding: ${props =>
    props.padding ||
    `calc(var(--spacing-factor) * 3) calc(var(--spacing-factor) * 4)`};
  color: ${props => props.color || `var(--white)`};
  background-color: ${props =>
    props.bgcolor ? props.bgcolor : `var(--light-blue)`};
  border: 1px solid ${props => props.bgcolor || `var(--light-blue)`};

  &:focus {
    outline: none;
    border-bottom-color: ${props => props.focus || `var(--white)`};
  }
`;

Input.displayName = 'Input';
export default Input;
