import styled from 'styled-components';

export const TabButton = styled.button`
  padding: var(--spacing-factor) calc(var(--spacing-factor) * 2);
  margin-right: calc(var(--spacing-factor) * 3);
  background: var(--grayish-white);
  border-radius: 3px 3px 0 3px;

  &:focus {
    outline: 0;
  }
  &.active {
    border-bottom: 2px solid var(--light-blue);
  }
`;
TabButton.displayName = 'TabButton';
