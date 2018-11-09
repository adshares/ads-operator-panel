import styled from 'styled-components';

export const BlockexplorerWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-gap: 24px;
  grid-template:
    'latest'
    'inventory'
    / 90vw;

  @media (min-width: 1600px) {
    grid-gap: calc(var(--spacing-factor) * 8);
    grid-template:
      'latest inventory'
      / 0.6fr 0.4fr;
  }
`;

BlockexplorerWrapper.displayName = 'BlockexplorerWrapper';
