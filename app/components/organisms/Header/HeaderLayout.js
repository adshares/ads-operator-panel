import styled from 'styled-components';
import { breakpoints } from '../../../utils/breakpoints';

export const HeaderWrapper = styled.header`
  width: 100%;
  grid-area: header;
  display: grid;
  grid-gap: 2px;
  grid-template:
    '. brand  navbar . search .'
    70px / 1.2fr 2fr 1fr 2fr 3fr 1.2fr;
  background: var(--blue);
  box-shadow: 0px 2px 8px 0 rgba(0, 0, 0, 0.16);

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
