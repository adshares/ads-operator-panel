import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { FaBars } from 'react-icons/fa';
import { NavBar, NavLink } from '../../molecules/NavBar';
import messages from './messages';
import IconButton from '../../atoms/Button/Button';
import { palette } from '../../../styleUtils/variables';

export const SmallHeaderNav = props => (
  <NavBar onMouseLeave={props.handleMouseLeave}>
    <NavLink to="/blockexplorer">
      <FormattedMessage {...messages.dashboard} />
    </NavLink>
    <NavLink to="/blockexplorer/nodes">
      <FormattedMessage {...messages.nodes} />
    </NavLink>
    <NavLink to="/blockexplorer/accounts">
      <FormattedMessage {...messages.accounts} />
    </NavLink>
    <NavLink to="/blockexplorer/transactions">
      <FormattedMessage {...messages.transactions} />
    </NavLink>
  </NavBar>
);

export const HeaderNav = props => (
  <NavBar onMouseLeave={props.handleMouseLeave}>
    <NavLink to="/blockexplorer">
      <FormattedMessage {...messages.dashboard} />
    </NavLink>
    <NavLink to="/blockexplorer/nodes">
      <FormattedMessage {...messages.nodes} />
    </NavLink>
    <NavLink to="/blockexplorer/accounts">
      <FormattedMessage {...messages.accounts} />
    </NavLink>
    <NavLink to="/blockexplorer/transactions">
      <FormattedMessage {...messages.transactions} />
    </NavLink>
    <NavLink to="/blockexplorer/messages">
      <FormattedMessage {...messages.messages} />
    </NavLink>
    <NavLink to="/blockexplorer/blocks">
      <FormattedMessage {...messages.blocks} />
    </NavLink>
  </NavBar>
);

SmallHeaderNav.propTypes = {
  handleMouseLeave: PropTypes.func,
};

HeaderNav.propTypes = {
  handleMouseLeave: PropTypes.func,
};

export const MobileHamburgerMenu = props => (
  <IconButton
    color={palette.white}
    bgcolor={palette.darkblue}
    style={{ gridArea: 'navbar' }}
    onMouseEnter={props.handleMouseEnter}
  >
    <FaBars />
  </IconButton>
);

MobileHamburgerMenu.propTypes = {
  handleMouseEnter: PropTypes.func,
};
