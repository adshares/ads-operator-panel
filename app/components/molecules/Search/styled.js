import styled from 'styled-components';
import { breakpoints } from './../../../utils/breakpoints';
import { rotateIn } from './../../../styleUtils/keyframes';

export const SearchWrapper = styled.span`
  grid-area: search;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;

  input {
    @media (max-width: ${breakpoints.tabletMd}px) {
      transform: rotateX(90deg);
      animation: ${rotateIn} 0.2s ease-in;
      animation-fill-mode: forwards;
    }
  }
`;

SearchWrapper.displayName = 'SearchWrapper';
