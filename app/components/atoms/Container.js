import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  width: ${props => props.width || `auto`};
  background-color: ${props => props.bgcolor || `transparent`};
  padding: ${props => props.padding || `0`};
  border-top: 1px solid ${props => props.borderTop || 'transparent'};
`;

Container.displayName = 'Container';
export default Container;
