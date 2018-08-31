/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const TableDataSetWrapper = styled.div`  
  td, th {
    text-align: center;
  }
  
  td.balance, td.amount {
    text-align: right;
  }
`;

TableDataSetWrapper.displayName = 'TableDataSetWrapper';
