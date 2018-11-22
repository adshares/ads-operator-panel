import styled from 'styled-components';
import List from '../../atoms/List';

export const TabListViewWrapper = styled.div`
  color: var(--gray);
  grid-area: ${props => props.gridArea || `panel`};
`;

export const TabListViewList = styled(List)`
  border-bottom: 1px solid var(--light-gray);
  align-items: center;
  justify-content: space-between;
`;

TabListViewWrapper.displayName = 'TabListViewWrapper';
TabListViewList.displayName = 'TabListViewList';
