import styled from 'styled-components';
import { fadeIn } from '../../../styleUtils/keyframes';

export const Table = styled.table`
  min-width: ${props => props.tableMinWidth || `auto`};
  table-layout: fixed;
  width: 100%;
  background-color: transparent;
  margin-top: ${props => props.margintop || `0`};
  opacity: 0;
  transform: scale(0.9);
  animation: ${fadeIn} 0.5s;
  animation-fill-mode: forwards;
`;

export const TableRow = styled.tr`
  background-color: var(--white);
  border: 4px solid var(--white-gray);

  ${({ showHoverAnimation }) =>
    showHoverAnimation &&
    `
  &:hover {
    position: relative;
    transform: scale(1.05);
    box-shadow: 0px 1px 0px #f8f9fa, 2px 1px 0px var(--blue);
  }
`};
`;

export const TableBody = styled.tbody`
  position: relative;
`;

export const TableCell = styled.td`
  vertical-align: middle;
  text-align: ${props => props.textalign || `center`};
  padding: var(--spacing-factor) calc(var(--spacing-factor) * 2);
  overflow: hidden;
  white-space: ${props => props.whitespace || 'nowrap'};
  text-overflow: ellipsis;
  word-break: ${props => props.textwrap || 'keep-all'};

  &.balance,
  &.amount {
    text-align: right;
  }
`;

export const TableHeader = styled.th`
  width: ${props => props.width || `auto`};
  text-align: ${props => props.textalign || `center`};
  padding: var(--spacing-factor) calc(var(--spacing-factor) * 2);
  background-color: ${props => props.bgcolor || `var(--white-gray)`};
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
