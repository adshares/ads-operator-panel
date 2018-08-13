/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const LatestPanelWrapper = styled.div`
  color: #6c7a89;
`;

export const List = styled.ul`
  border-bottom: 3px solid #bdc3c7;
  width: 100%;
`;

export const ListItem = styled.li`
  color: #6c7a89;
`;

export const Button = styled.button`
  margin-right: 20px;
 
  &:hover {
    text-decoration: underline;
  }
  &.active {
    border-bottom: 4px solid #5dbcd2;    
  }
`;

export const IconWrapper = styled.span`
  margin-right: 7px;  
`;

LatestPanelWrapper.displayName = 'LatestPanelWrapper';
List.displayName = 'List';
ListItem.displayName = 'ListItem';
Button.displayName = 'Button';
IconWrapper.displayName = 'IconWrapper';
