import styled from 'styled-components';
import { fadeIn } from '../../../styleUtils/keyframes';
import { breakpoints } from '../../../utils/breakpoints';

export const Table = styled.table`
  min-width: ${props => props.tableMinWidth || `auto`};
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
  border-left: 2px solid var(--white);
  border-right: 2px solid var(--white);
  border-top: 1px solid var(--grayish-white);

  ${({ singleColorRow }) =>
    singleColorRow &&
    `
      background: var(--white);
`};

  ${({ showHoverAnimation }) =>
    showHoverAnimation &&
    `
      @media (max-width: ${breakpoints.tabletLg}px) {
        &:hover {
          background-color: var(--light);
        }
      }
      @media (min-width: ${breakpoints.tabletLg}px) {
        &:hover {
          border-right-color: var(--blue);
        }
      }
`};
`;

export const TableBody = styled.tbody`
  position: relative;
`;

export const TableCellStyled = styled.td`
  vertical-align: middle;
  text-align: ${props => props.textalign || `center`};
  padding: calc(var(--spacing-factor)) calc(var(--spacing-factor));
  white-space: ${props => props.whitespace || 'nowrap'};
  word-break: ${props => props.textwrap || 'keep-all'};
  position: relative;
  background-color: inherit;

  .ellipsisActive {
    display: block;
    padding: -(var(--spacing-factor));
    font-family: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: inherit;

    &:hover {
      position: absolute;
      padding-right: calc(var(--spacing-factor) * 2);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;
      top: 0;
      height: 40px;
    }
  }

  &.time,
  &.mtim,
  &.version {
    font-size: small;
  }

  .balance,
  .amount {
    text-align: right;
    min-width: 12ch;
  }

  &.public_key,
  &.hash,
  &.now_hash,
  &.signature {
    max-width: 120px;
  }

  &.id ${/* sc-selector */ IconTableCell} {
    padding-left: 7px;
  }
`;

export const TableHeaderRow = styled.tr`
  border-left: 2px solid var(--white);
  border-right: 2px solid var(--white);
`;

export const TableHeaderCell = styled.th`
  width: ${props => props.width || `auto`};
  text-align: ${props => props.textalign || `center`};
  padding: var(--spacing-factor) calc(var(--spacing-factor) * 2);
  background-color: ${props => props.bgcolor || `var(--white-gray)`};
  color: var(--gray);
  font-family: var(--font-family-title);
  font-weight: 400;
  text-transform: uppercase;
  font-size: small;
  a {
    color: var(--gray);
    * {
      vertical-align: middle;
    }
  }
`;

export const TableNoData = styled.div`
  text-align: center;
  font-size: 21px;
  padding: calc(var(--spacing-factor) * 4);
  background-color: var(--white-gray);
  color: var(--dust-gray);
`;

export const IconCellDescription = styled.span`
  padding-left: var(--spacing-factor);
  color: var(--moon-gray);
  text-transform: capitalize;
`;

export const IconTableCell = styled.span`
  color: ${props => props.color || 'var(--gray)'};
  display: inline-block;
  min-width: 17px;
  vertical-align: middle;
  box-sizing: content-box;
`;

export const IconTableCellWrapper = styled.span`
  display: flex;
  align-items: center;
`;

TableHeaderRow.displayName = 'TableHeaderRow';
TableHeaderCell.displayName = 'TableHeaderCell';
TableRow.displayName = 'TableRow';
TableCellStyled.displayName = 'TableCellStyled';
TableBody.displayName = 'TableBody';
Table.displayName = 'Table';
IconCellDescription.displayName = 'IconCellDescription';
IconTableCell.displayName = 'IconTableCell';
IconTableCellWrapper.displayName = 'IconTableCellWrapper';
