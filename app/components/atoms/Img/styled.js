import styled from 'styled-components';

export default styled.img`
  margin: ${props => props.margin || `var(--spacing-factor)`};
  height: ${props => props.height || `20px`};
`;
