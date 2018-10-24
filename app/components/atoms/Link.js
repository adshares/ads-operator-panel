import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LinkWhite = styled(Link)`
  color: white;
  cursor: pointer;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;

LinkWhite.displayName = 'LinkWhite';
export default LinkWhite;
