/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const SearchWrapper = styled.div`  
  .search { 
    position: relative; 
  }
  
  .search input { text-indent: 30px;}
  
  .search svg { 
    position: absolute;
    top: 12px;
    left: 7px;
    font-size: 15px;
  }
`;

SearchWrapper.displayName = 'SearchWrapper';
