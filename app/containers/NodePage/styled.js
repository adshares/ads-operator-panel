/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import { LatestPanelWrapper } from '../../components/organisms/LatestPanel/styled';
export const NodePageWrapper = styled.div`
  /* https://github.com/styled-components/stylelint-processor-styled-components/issues/54 */
  ${/* sc-selector */LatestPanelWrapper} { 
    margin-bottom: 50px;  
  }
`;
