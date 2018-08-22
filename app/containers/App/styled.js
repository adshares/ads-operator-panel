/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const AppContainer = styled.div`
  .breadcrumb li:after {
    content: "/";
    margin-left: 5px;
    margin-right: 5px;
  }
  .breadcrumb li:last-child:after {
    content: "";
  }
`;
