/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import { LatestPanelWrapper } from '../../components/organisms/LatestPanel/styled';
import { IconTableCell } from '../../components/molecules/Table/TableElements'
export const AccountPageWrapper = styled.div`
  /* https://github.com/styled-components/stylelint-processor-styled-components/issues/54 */
  ${/* sc-selector */LatestPanelWrapper} {
    margin-bottom: 50px;
  }
  h1 ${/* sc-selector */IconTableCell} {
    margin-left: 20px;
    vertical-align: bottom;
  }
`;
