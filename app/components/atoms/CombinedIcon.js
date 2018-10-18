import styled from 'styled-components';

export const CombinedIcon = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 16px;
  width: 16px;
  position: relative;
  color: var(--green);

  & svg {
    position: absolute;

    &:nth-of-type(1) {
      top: -8px;
      transform: rotate(-30deg);
    }
    &:nth-of-type(2) {
      right: ${props => (props.reversed ? '-4px' : '4px')};
    }
    &:nth-of-type(3) {
      top: 8px;
      transform: rotate(30deg);
    }
  }
`;

CombinedIcon.displayName = 'CombinedIcon';
export default CombinedIcon;
