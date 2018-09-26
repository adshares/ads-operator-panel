import styled from 'styled-components';

export const TabButton = styled.button`
  padding: var(--spacing-factor) calc(var(--spacing-factor) * 2);
  border: 1px solid var(--grayish-white);
  background-color: var(--white);
  cursor: pointer;

  &:focus {
    outline: 0;
  }
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid var(--light-blue);
    background-color: var(--grayish-white);`};
`;
TabButton.displayName = 'TabButton';
