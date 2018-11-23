import styled from 'styled-components';
import { breakpoints } from '../../utils/breakpoints';
import { scaleIn } from '../../styleUtils/keyframes';
import LinkButton from '../atoms/Button/LinkButton';

export const NavBar = styled.nav`
  grid-area: navbar;
  display: flex;
  justify-content: center;
  margin-top: 7px;

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

export const NavLink = styled(LinkButton)`
  font-size: 0.9rem;
`;

NavBar.displayName = 'NavBar';
NavLink.displayName = 'NavLink';
export default NavBar;
