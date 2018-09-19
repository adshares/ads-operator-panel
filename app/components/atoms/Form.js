import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  width: ${props => props.width || `auto`};
`;

Form.displayName = 'Form';
export default Form;
