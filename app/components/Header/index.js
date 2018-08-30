import React from 'react';
import { Route } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Search from 'components/Search';
import Img from 'components/Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import messages from './messages';
import Logo from './adshares.png';
import { HeaderWrapper } from './styled';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return (
      <HeaderWrapper className="row">
        <span className="col-md-1">
          <Img src={Logo} alt="react-boilerplate - Logo" />
        </span>
        <span className="col-md-3">
          <NavBar>
            <HeaderLink to="/blockexplorer">
              <FormattedMessage {...messages.blockexplorer} />
            </HeaderLink>
          </NavBar>
        </span>
        <span className="col-md-8">
          <Route
            path="/:path"
            render={props => <Search history={props.history} />}
          />
        </span>
      </HeaderWrapper>
    );
  }
}

Header.propTypes = {};

export default Header;
