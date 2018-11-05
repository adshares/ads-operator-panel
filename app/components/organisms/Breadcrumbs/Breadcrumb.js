import styled from 'styled-components';
import { breakpoints } from './../../../utils/breakpoints';

export const Breadcrumb = styled.li`
  display: block;
  color: var(--blue);
  position: relative;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  font-family: var(--font-family-title);

  &:after {
    content: '>';
    margin: 0 var(--spacing-factor);
    border-color: transparent;
    border-left-color: var(--light-blue);
    line-height: 24px;
  }

  @media screen and (max-width: ${breakpoints.tabletSm}px) {
    &:not(:nth-last-of-type(2)) {
      display: none;
    }

    &:after {
      display: none;
    }

    &:before {
      content: '<';
      border-color: transparent;
      border-left-color: var(--light-blue);
    }

    a {
      margin-left: var(--spacing-factor);
    }
  }

  a {
    color: inherit;
    text-decoration: none;

    &:focus,
    &:hover {
      outline: none;
      text-decoration: underline;
    }
  }
`;

Breadcrumb.displayName = 'Breadcrumb';
export default Breadcrumb;
