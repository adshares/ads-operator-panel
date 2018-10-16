import styled from 'styled-components';
import { fadeIn } from '../../../styleUtils/keyframes';

export const Table = styled.table`
  min-width: ${props => props.tableMinWidth || `auto`};
  table-layout: fixed;
  width: 100%;
  background-color: transparent;
  margin-top: ${props => props.margintop || `0`};
  animation: ${fadeIn} 0.5s;
  animation-fill-mode: forwards;
  ${({ showIntroAnimation }) =>
    showIntroAnimation &&
    `
    opacity:0;
    transform: scale(0.95);
`};
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

export const TableCellStyled = styled.td`
  vertical-align: middle;
  text-align: ${props => props.textalign || `center`};
  padding: var(--spacing-factor) calc(var(--spacing-factor) * 2);
  white-space: ${props => props.whitespace || 'nowrap'};
  word-break: ${props => props.textwrap || 'keep-all'};
  position: relative;

  .ellipsisActive {
    display: block;
    padding: -(var(--spacing-factor));
    font-family: inherit;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      position: absolute;
      background-color: var(--white);
      padding: 0 calc(var(--spacing-factor) * 2);
      z-index: 10;
      top: -1px;
      display: flex;
      height: 44px;
      align-items: center;

      &:not(.id):not(.block_id) {
        transform: translateX(-25px);
      }
    }

    &.time:hover {
      padding: 0 calc(var(--spacing-factor) * 4);
      border-right: 2px solid var(--blue);
    }
  }

  .balance,
  .amount {
    text-align: right;
    min-width: 12ch;
  }

  .id,
  .balance,
  .amount {
    font-family: 'Cousine', monospace;
    letter-spacing: 0.5px;
  }

  & div a {
    display: inline-block;
    position: relative;
    z-index: 1;
    padding-right: calc(var(--spacing-factor) * 5);
    margin-right: calc(var(--spacing-factor) * (-5));
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
TableCellStyled.displayName = 'TableCellStyled';
TableBody.displayName = 'TableBody';
Table.displayName = 'Table';
