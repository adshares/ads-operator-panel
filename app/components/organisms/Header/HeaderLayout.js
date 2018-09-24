import styled from 'styled-components';
import { breakpoints } from '../../../utils/breakpoints';

export const HeaderWrapper = styled.header`
  width: 100%;
  grid-area: header;
  display: grid;
  grid-gap: 2px;
  grid-template:
    '. brand  navbar . search .'
    / 1fr 2fr 1fr 2fr 3fr 1fr;
  background: var(--blue);

  @media (max-width: ${breakpoints.tabletMd}px) {
    grid-template:
      '. brand . search navbar'
      / 20px 1fr 20px 2fr 80px;
  }

  @media (max-width: ${breakpoints.mobileLg}px) {
    grid-template:
      '. brand . search navbar'
      / 20px 56px 20px 2fr 80px;
  }
`;

HeaderWrapper.displayName = 'HeaderWrapper';
