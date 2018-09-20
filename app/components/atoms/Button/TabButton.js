import styled from 'styled-components';

export const TabButton = styled.button`
  padding: 8px 16px;
  margin-right: 24px;
  background: #f2f2f2;
  border-radius: 3px 3px 0 3px;

  &:focus {
    outline: 0;
  }
  &.active {
    border-bottom: 2px solid var(--light-blue);
  }
`;
TabButton.displayName = 'TabButton';
