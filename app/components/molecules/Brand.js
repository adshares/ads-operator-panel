import styled from 'styled-components';
import { breakpoints } from '../../utils/breakpoints';

export default styled.div`
  display: flex;
  align-items: center;
  grid-area: brand;

  strong {
    color: var(--white);
    position: relative;
    top: 3px;
    left: 10px;

    @media (max-width: ${breakpoints.tabletMd}px) {
      display: none;
    }
  }
`;
