import styled from 'styled-components';
import { breakpoints } from '../../utils/breakpoints';

export const AppContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 0.7fr 5fr 0.7fr;
  grid-template-rows: 88px 40px 1fr;
  grid-template-areas:
    'header header header '
    '. breadcrumbs . '
    '. container . ';

  @media (max-width: ${breakpoints.tabletMd}px) {
    grid-template:
      'header header header' 74px
      '. breadcrumbs .' 40px
      '. container  .' 1fr / 24px 1fr 24px;
  }
`;

AppContainer.displayName = 'AppContainer';
export default AppContainer;
