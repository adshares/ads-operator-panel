import styled from 'styled-components';

export const Breadcrumb = styled.li`
  display: block;
  padding: 0 var(--spacing-factor);
  margin-right: calc(var(--spacing-factor) * 2);
  color: var(--dark-blue);
  position: relative;
  text-decoration: none;
  text-align: center;

  &:after {
    content: '>';
    position: absolute;
    left: 105%;
    border-color: transparent;
    border-left-color: var(--light-blue);
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
