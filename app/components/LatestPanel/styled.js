/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const LatestPanelWrapper = styled.div`
  color: #6c7a89;
`;

export const List = styled.ul`
  display: inline;
  border-bottom: 3px solid #bdc3c7;
  width: 100%;
  
  .view-all {
    float: right !important;
  }
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
