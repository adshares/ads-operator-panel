import styled from 'styled-components';
import { fadeIn } from '../../../styleUtils/keyframes';

export const Table = styled.table`
  min-width: ${props => props.tableMinWidth || `auto`};
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
  transition: transform 0.25s ease-in;

  &:hover {
    position: relative;
    transform: scale(1.05);
    box-shadow: 0px 1px 0px #f8f9fa, 2px 1px 0px var(--blue);
  }
`;

export const TableBody = styled.tbody`
  position: relative;
`;

export const TableCellStyled = styled.td`
  vertical-align: middle;
  text-align: center;
  padding: var(--spacing-factor) calc(var(--spacing-factor) * 2);
  position: relative;
  white-space: nowrap;

  .ellipsisActive {
    display: block;
    padding: -(var(--spacing-factor));
    min-width: 12ch;
    font-family: inherit;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      position: absolute;
      background-color: var(--white);
      padding: 0 calc(var(--spacing-factor) * 3);
      transform: translateX(-45px);
      z-index: 10;
      top: -1px;
      display: flex;
      height: 44px;
      align-items: center;
    }

    &.time:hover {
      padding: 0 calc(var(--spacing-factor) * 4);
      border-right: 2px solid var(--blue);
    }
  }

  .balance,
  .amount {
    text-align: right;
  }

  .id,
  .balance,
  .amount {
    font-family: 'Cousine', monospace;
    letter-spacing: 0.5px;
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
TableCellStyled.displayName = 'TableCellStyled';
TableBody.displayName = 'TableBody';
Table.displayName = 'Table';
