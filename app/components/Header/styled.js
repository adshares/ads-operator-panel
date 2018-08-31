/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  padding-top: 1em;
  
  img { 
    height: 42px;
  }
  
  strong {
    position: relative;
    top: 3px;
    left: 10px;        
  }
`;

HeaderWrapper.displayName = 'HeaderWrapper';
