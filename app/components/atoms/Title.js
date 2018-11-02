import styled from 'styled-components';

export const Title = styled.h1`
  margin: 0 0 10px calc(var(--spacing-factor) * 4);
  line-height: 1;
  color: ${props => props.color || `var(--dark-blue)`};
`;

Title.displayName = 'Title';
