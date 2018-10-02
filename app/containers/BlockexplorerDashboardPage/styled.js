import styled from 'styled-components';
import { breakpoints } from '../../utils/breakpoints';

export const BlockexplorerWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-gap: 24px;
  grid-template:
    'node'
    'block'
    'latestTrans'
    / 90vw;

  @media (min-width: ${breakpoints.tabletLg}px) {
    grid-template:
      'node block'
      'latestTrans latestTrans'
      / 50% 1fr;
  }

  @media (min-width: ${breakpoints.desktopLg}px) {
    grid-gap: calc(var(--spacing-factor) * 8);
  }
`;

BlockexplorerWrapper.displayName = 'BlockexplorerWrapper';
