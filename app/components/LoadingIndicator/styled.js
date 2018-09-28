import styled from 'styled-components';

export const Loader = styled.div`
  width: 50px;
  height: 40px;
  position: relative;
  margin: 0 auto;
`;

export const LoaderWrapper = styled.div`
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || '100%'};
  position: relative;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.bgcolor || 'transparent'};
`;
