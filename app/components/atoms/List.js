import styled from 'styled-components';

export const List = styled.ul`
  padding: ${props => props.padding || 0};
  margin: ${props => props.margin || 0};
  display: flex;
  flex-direction: ${props => props.direction || `row`};
  list-style: ${props => props.listStyle || `none`};
`;

List.displayName = 'List';
export default List;
