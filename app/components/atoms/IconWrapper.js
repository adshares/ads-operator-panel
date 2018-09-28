import styled from 'styled-components';

export const IconWrapper = styled.span`
  margin-right: 7px;
  ${({ active }) =>
    active &&
    `
    color: var(--blue);
`};
`;

IconWrapper.displayName = 'IconWrapper';
