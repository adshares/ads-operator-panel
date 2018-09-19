import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Search from './../../molecules/Search';
import Img from './../../atoms/Img';
import Brand from '../../molecules/Brand';
import Logo from '../../assets/adshares.png';
import { HeaderWrapper } from './HeaderLayout';
import { breakpoints } from '../../../utils/breakpoints';
import { HeaderNav, MobileHamburgerMenu } from './HeaderNav';
import { breakpointIsLessThan } from '../../../utils/responsiveHelpers';

class Header extends React.Component {
  toggleMenuOpen = state => {
    this.setState({
      showNavigation: state,
    });
  };

  constructor(props) {
    super(props);

    this.state = {
      showNavigation: false,
    };
  }

  render() {
    const smallScreen = breakpointIsLessThan(
      breakpoints.tabletMd,
      this.props.breakpoint.size,
    );
    const { showNavigation } = this.state;
    return (
      <HeaderWrapper>
        <Brand>
          <Img src={Logo} alt="Adshares" height="52px" />
          <strong>ADS Operator</strong>
        </Brand>

        {smallScreen && (
          <MobileHamburgerMenu
            handleMouseEnter={() => this.toggleMenuOpen(true)}
          />
        )}

        {(!smallScreen || showNavigation) && (
          <HeaderNav handleMouseLeave={() => this.toggleMenuOpen(false)} />
        )}

        <Route
          path="/:path"
          render={props => (
            <Search
              history={props.history}
              breakpoint={this.props.breakpoint}
            />
          )}
        />
      </HeaderWrapper>
    );
  }
}

Header.propTypes = {
  breakpoint: PropTypes.object,
};

export default Header;
