import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { FaBars } from 'react-icons/fa';
import NavBar from '../../molecules/NavBar';
import HeaderLink from '../../atoms/LinkButton';
import messages from './messages';
import IconButton from '../../atoms/Button/styled';
import { palette } from '../../../styleUtils/variables';

export const HeaderNav = props => (
  <NavBar onMouseLeave={props.handleMouseLeave}>
    <HeaderLink to="/blockexplorer">
      <FormattedMessage {...messages.blockexplorer} />
    </HeaderLink>
  </NavBar>
);

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
