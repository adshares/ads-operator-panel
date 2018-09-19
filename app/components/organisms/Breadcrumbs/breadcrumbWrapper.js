import styled from 'styled-components';
import List from '../../atoms/List';

export const BreadcrumbsWrapper = styled(List)`
  grid-area: breadcrumbs;
`;

BreadcrumbsWrapper.displayName = 'BreadcrumbsWrapper';
export default BreadcrumbsWrapper;
