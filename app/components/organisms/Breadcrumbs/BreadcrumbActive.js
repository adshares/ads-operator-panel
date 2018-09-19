import styled from 'styled-components';

export const BreadcrumbActive = styled.li`
  margin-right: calc(var(--spacing-factor) * 2);
  padding: 0 var(--spacing-factor);
  color: var(--dark-blue);
  font-weight: 600;
  display: block;
  text-decoration: none;
  position: relative;
  text-align: center;
`;

BreadcrumbActive.displayName = 'BreadcrumbActive';
export default BreadcrumbActive;
