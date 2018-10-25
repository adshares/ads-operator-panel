import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const LinkButton = styled(NavLink)`
  display: inline-flex;
  padding: calc(var(--spacing-factor) * 3);
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  color: var(--light);
  position: relative;
  justify-content: center;

  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    margin: auto;
    height: 3px;
    width: 0px;
    background-color: transparent;
    transition: width 0.5s ease, background-color 0.5s ease;
  }

  &:hover {
    text-decoration: none;
    color: var(--white);
    &:after {
      width: calc(100% - (24px * 2));
      background-color: var(--white);
    }
  }

  &:active,
  &.active {
    text-decoration: none;
    color: var(--white);
    &:after {
      width: calc(100% - (var(--spacing-factor) * 2));
      background-color: var(--white);
    }
  }
`;

LinkButton.displayName = 'LinkButton';
export default LinkButton;
