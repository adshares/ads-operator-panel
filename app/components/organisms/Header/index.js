import React from 'react';
import { Route } from 'react-router-dom';
import Search from './../../molecules/Search';
import Img from './../../atoms/Img';
import Brand from '../../molecules/Brand';
import Logo from '../../assets/adshares.png';
import { HeaderWrapper } from './HeaderLayout';

import { HeaderNav, MobileHamburgerMenu } from './HeaderNav';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  toggleMenuOpen = state => {
    this.setState({
      showNavigation: state,
    });
  };

  constructor() {
    super();
    this.state = {
      mobileDevice: '',
    };
  }

  componentWillMount() {
    this.setState({
      mobileDevice: window.matchMedia('(max-width: 768px)').matches,
    });
    window.addEventListener('resize', () => this.handleResize);
  }

  handleResize() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (this.state.mobileDevice === isMobile) {
      this.setState({
        mobileDevice: window.matchMedia('(max-width: 768px)').matches,
      });
    }
  }

  render() {
    return (
      <HeaderWrapper>
        <Brand>
          <Img src={Logo} alt="Adshares" height="42px" />
          <strong>ADS Operator</strong>
        </Brand>

        {this.state.mobileDevice && (
          <MobileHamburgerMenu
            handleMouseEnter={() => this.toggleMenuOpen(true)}
          />
        )}

        {(!this.state.mobileDevice || this.state.showNavigation) && (
          <HeaderNav
            handleMouseLeave={() => this.toggleMenuOpen(false)}
            handleBlur={() => this.toggleMenuOpen(false)}
          />
        )}

        <Route
          path="/:path"
          render={props => <Search history={props.history} />}
        />
      </HeaderWrapper>
    );
  }
}

Header.propTypes = {};

export default Header;
