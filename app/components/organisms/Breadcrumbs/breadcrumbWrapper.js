import styled from 'styled-components';
import List from '../../atoms/List';
import { breakpoints } from '../../../utils/breakpoints';

export const BreadcrumbsWrapper = styled(List)`
  grid-area: breadcrumbs;
  align-items: center;
  width: 100%;

  @media (max-width: ${breakpoints.tabletMd}px) {
    padding: calc(var(--spacing-factor) * 3);
  }
`;

BreadcrumbsWrapper.displayName = 'BreadcrumbsWrapper';
export default BreadcrumbsWrapper;
