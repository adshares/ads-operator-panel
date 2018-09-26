import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  width: ${props => props.width || `auto`};
  min-height: ${props => props.minheight || `100%`};
  background-color: ${props => props.bgcolor || `transparent`};
  padding: ${props => props.padding || `0`};
  border-top: 1px solid ${props => props.borderTop || 'transparent'};
`;

Container.displayName = 'Container';
export default Container;
