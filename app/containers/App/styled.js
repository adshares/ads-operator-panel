import styled from 'styled-components';
import { breakpoints } from '../../utils/breakpoints';
import testImage from './assets/test.png';

export const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 0.7fr 5fr 0.7fr;
  grid-template-rows: 70px 40px 1fr;
  grid-template-areas:
    'header header header '
    '. breadcrumbs . '
    '. container . ';

  @media (max-width: ${breakpoints.tabletMd}px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  ${({ testEnv }) =>
    testEnv &&
    `
    background-image: url(${testImage});
    background-repeat: repeat; 
  `};
`;

AppContainer.displayName = 'AppContainer';
export default AppContainer;
