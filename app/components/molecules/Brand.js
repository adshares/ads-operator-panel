import styled from 'styled-components';
import { breakpoints } from '../../utils/breakpoints';

export const Brand = styled.div`
  display: flex;
  align-items: center;
  grid-area: brand;
  color: var(--white);

  ${({ testEnv }) =>
    testEnv &&
    `
      color: var(--red);
      font-weight: 600;
    `};

  strong {
    color: inherit;
    position: relative;
    top: 3px;
    left: 10px;

    @media (max-width: ${breakpoints.tabletMd}px) {
      display: none;
    }
  }
`;

Brand.displayName = 'Brand';
export default Brand;
