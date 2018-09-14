/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import { mediaQuery } from './../../../styleUtils/variables';
import {rotateIn} from './../../../styleUtils/keyframes';

export const SearchWrapper = styled.span`  
  grid-area: search;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  input {
    @media (max-width: ${mediaQuery.tablet}) {
      transform: rotateX(90deg);
      animation: ${rotateIn} 0.2s ease-in;
      animation-fill-mode: forwards;
    }
  }
 
`;

SearchWrapper.displayName = 'SearchWrapper';
