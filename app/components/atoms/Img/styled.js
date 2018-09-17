import styled from 'styled-components';

export const Image = styled.img`
  margin: ${props => props.margin || `var(--spacing-factor)`};
  height: ${props => props.height || `20px`};
`;

Image.displayName = 'Image';
export default Image;
