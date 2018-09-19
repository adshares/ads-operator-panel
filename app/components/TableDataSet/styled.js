import styled from 'styled-components';
import { breakpoints } from '../../utils/breakpoints';

export const TableDataSetWrapper = styled.table`
  min-width: 500px;
  table-layout: fixed;
  td,
  th {
    text-align: center;
    padding: 8px 16px;
  }

  td {
    word-break: break-word;
    min-width: 150px;
  }

  td.balance,
  td.amount {
    text-align: right;
  }
`;

TableDataSetWrapper.displayName = 'TableDataSetWrapper';

export const ScrollableWrapper = styled.div`
  @media (max-width: ${breakpoints.tabletMd}px) {
    overflow: hidden;
    overflow-x: scroll;
    width: 100%;
  }
`;
ScrollableWrapper.displayName = 'ScrollableWrapper';
