import styled from 'styled-components';

export const ScrollableWrapper = styled.div`
  position: relative;
  overflow: hidden;
  overflow-x: auto;
  width: 100%;
  box-shadow: var(--box-shadow);
`;
ScrollableWrapper.displayName = 'ScrollableWrapper';
