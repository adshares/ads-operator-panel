import styled from 'styled-components';

export const CombinedIcon = styled.div`
  height: 16px;
  margin-right: calc(var(--spacing-factor) * 2);
  position: relative;
  color: var(--green);

  & svg {
    position: absolute;

    &:first-of-type {
      top: -4px;
    }
    &:last-of-type {
      top: 4px;
    }
  }
`;

CombinedIcon.displayName = 'CombinedIcon';
export default CombinedIcon;
