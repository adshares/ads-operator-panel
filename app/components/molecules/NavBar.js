import styled from 'styled-components';
import { breakpoints } from '../../utils/breakpoints';
import { scaleIn } from '../../styleUtils/keyframes';

export default styled.nav`
  grid-area: navbar;
  display: flex;
  justify-content: center;

  @media (max-width: ${breakpoints.tabletMd}px) {
    flex-direction: column;
    position: absolute;
    background: inherit;
    z-index: 1;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    right: 0;
    transform: rotateX(90deg) scale(0.9);
    animation: ${scaleIn} 0.5s;
    animation-fill-mode: forwards;
  }
`;
