import styled from 'styled-components';
import { mediaQuery } from '../../styleUtils/variables';

export default styled.div`
  display: flex;
  align-items: center;
  grid-area: brand;

  strong {
    color: var(--white);
    position: relative;
    top: 3px;
    left: 10px;

    @media (max-width: ${mediaQuery.tablet}) {
      display: none;
    }
  }
`;
