import styled from 'styled-components';

export const Table = styled.table`
  min-width: 100%;
  table-layout: fixed;
  width: 100%;
  background-color: transparent;
  margin-top: 32px;
`;

export const TableRow = styled.tr`
  background-color: var(--white);
  border: 4px solid #fafafa;
  height: 76px;

  &:hover {
    position: relative;
    border-right: 2px solid var(--light-blue);
  }
`;

export const TableBody = styled.tbody`
  position: relative;
`;

export const TableCell = styled.td`
  vertical-align: middle;
  text-align: center;
  padding: var(--spacing-factor) calc(var(--spacing-factor) * 2);
  min-width: 150px;
  word-break: break-word;

  &.balance,
  &.amount {
    text-align: right;
  }
`;

export const TableHeader = styled.th`
  text-align: center;
  padding: var(--spacing-factor) calc(var(--spacing-factor) * 2);
  background-color: #fafafa;
  color: #a5a7aa;
`;
export const TableNoData = styled.div`
  text-align: center;
  font-size: 21px;
  padding: calc(var(--spacing-factor) * 4);
  background-color: #fafafa;
  color: #a5a7aa;
`;

TableHeader.displayName = 'TableHeader';
TableRow.displayName = 'TableRow';
TableCell.displayName = 'TableCell';
TableBody.displayName = 'TableBody';
Table.displayName = 'Table';
