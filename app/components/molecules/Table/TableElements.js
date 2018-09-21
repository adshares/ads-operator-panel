import styled from 'styled-components';
import { fadeIn } from '../../../styleUtils/keyframes';

export const Table = styled.table`
  min-width: 100%;
  table-layout: fixed;
  width: 100%;
  background-color: transparent;
  margin-top: calc(var(--spacing-factor) * 4);
  opacity: 0;
  transform: scale(0.9);
  animation: ${fadeIn} 0.5s;
  animation-fill-mode: forwards;
`;

export const TableRow = styled.tr`
  background-color: var(--white);
  border: 4px solid var(--white-gray);
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
  background-color: var(--white-gray);
  color: var(--dust-gray);
`;
export const TableNoData = styled.div`
  text-align: center;
  font-size: 21px;
  padding: calc(var(--spacing-factor) * 4);
  background-color: var(--white-gray);
  color: var(--dust-gray);
`;

TableHeader.displayName = 'TableHeader';
TableRow.displayName = 'TableRow';
TableCell.displayName = 'TableCell';
TableBody.displayName = 'TableBody';
Table.displayName = 'Table';
