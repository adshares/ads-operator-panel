import styled from 'styled-components';
import List from '../atoms/List';

export const LatestPanelWrapper = styled.div`
  color: var(--gray);
  grid-area: ${props => props.gridArea || `panel`};

  table {
    min-width: ${props => props.minTableWidth || `500px`};
  }
`;

export const LatestPanelList = styled(List)`
  border-bottom: 1px solid var(--light-gray);
  align-items: center;
  justify-content: space-between;
`;

export const ListItem = styled.li`
  color: var(--gray);
`;

LatestPanelWrapper.displayName = 'LatestPanelWrapper';
List.displayName = 'List';
ListItem.displayName = 'ListItem';
