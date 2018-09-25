/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const LatestPanelWrapper = styled.div`
  color: var(--gray);
  display: flex;
  flex-direction: column;
  max-width: 90vw;
`;

export const ListItem = styled.li`
  color: #6c7a89;

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

export const IconWrapper = styled.span`
  margin-right: 7px;
  .active & {
  color: var(--blue);
  }
`;

export const CopyToClipboardWrapper = styled.div`
  margin: 10px auto;
  display: flex;
  justify-content: center;
`;

LatestPanelWrapper.displayName = 'LatestPanelWrapper';
ListItem.displayName = 'ListItem';
Button.displayName = 'Button';
IconWrapper.displayName = 'IconWrapper';
