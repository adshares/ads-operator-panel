import styled from 'styled-components';
import { breakpoints } from '../../../utils/breakpoints';

export const HeaderWrapper = styled.header`
  width: 100%;
  display: grid;
  grid-gap: 2px;
  grid-template:
    '. brand navbar profile search'
    / 80px 2fr auto 2fr 1fr;
  background: var(--blue);

  @media (max-width: ${breakpoints.tabletMd}px) {
    grid-template:
      '. brand . search navbar'
      / 20px 1fr 20px 1fr 80px;
  }
`;

HeaderWrapper.displayName = 'HeaderWrapper';
