import styled from 'styled-components';
import { breakpoints } from '../../utils/breakpoints';

export const ScrollableWrapper = styled.div`
  position: relative;

  @media (max-width: ${breakpoints.desktopSm}px) {
    overflow: hidden;
    overflow-x: scroll;
    width: 100%;
  }

  @media (max-width: ${breakpoints.tabletMd}px) {
    overflow: hidden;
    overflow-x: scroll;
    width: 100%;
  }
`;
ScrollableWrapper.displayName = 'ScrollableWrapper';
