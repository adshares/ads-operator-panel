import styled from 'styled-components';

export const LatestPanelWrapper = styled.div`
  color: #6c7a89;
  grid-area: ${props => props.gridArea || `panel`};
`;

export const List = styled.ul`
  display: inline;
  border-bottom: 3px solid #bdc3c7;
  width: 100%;
`;

export const ListItem = styled.li`
  color: #6c7a89;
  float: left;

  &:hover {
    cursor: pointer;
  }
`;

export const Button = styled.button`
  margin-right: 20px;

  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: 0;
  }
  &.active {
    border-bottom: 4px solid #5dbcd2;
  }
`;

LatestPanelWrapper.displayName = 'LatestPanelWrapper';
List.displayName = 'List';
ListItem.displayName = 'ListItem';
Button.displayName = 'Button';
