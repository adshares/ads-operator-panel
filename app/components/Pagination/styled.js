import styled from 'styled-components';

export const PaginationWrapper = styled.nav`
  margin: calc(var(--spacing-factor) * 5);
`;

export const PaginationListElement = styled.li`
  padding: var(--spacing-factor) calc(var(--spacing-factor) * 2);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--light-blue);
  background-color: white;
  border: 1px solid var(--light-gray);
  font-family: var(--font-family-title);

  &:first-of-type {
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
  }

  &:last-of-type {
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
  }

  & + & {
    border-left: 0;
  }

  &:hover,
  &:focus {
    opacity: 0.9;
    outline: none;
  }
  ${({ active, disabled }) =>
    (active &&
      `
    background: var(--light-blue);
    color: var(--white);
    border: 0;
    
    &:hover,
    &:focus-within {
      background-color: var(--blue);
      outline: none;
  }
      `) ||
    (disabled &&
      `
      color: var(--dust-gray);
      pointer-events: none;
      cursor: not-allowed;`)};
`;

PaginationListElement.displayName = 'PaginationListElement';
