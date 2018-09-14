/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import { mediaQuery } from '../../../styleUtils/variables';

export const HeaderWrapper = styled.header`
  width: 100%;
  display: grid;
  grid-gap: 2px;
  grid-template: ". brand navbar profile search"
                  / 80px 2fr auto 2fr 1fr;
  background: var(--blue);
  

  @media (max-width: ${mediaQuery.tablet}) {
    grid-template: ". brand . search navbar" 
    / 20px 1fr 20px 1fr 80px;
  }
  
`;

HeaderWrapper.displayName = 'HeaderWrapper';
