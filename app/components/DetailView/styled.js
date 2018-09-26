import styled from 'styled-components';

export const LatestPanelWrapper = styled.div`
  color: var(--gray);
  display: flex;
  flex-direction: column;
  max-width: 90vw;
`;

export const CopyToClipboardWrapper = styled.div`
  margin: var(--spacing-factor) auto;
  display: flex;
  justify-content: center;
`;

LatestPanelWrapper.displayName = 'LatestPanelWrapper';
