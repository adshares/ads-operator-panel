/* eslint-disable react/prefer-stateless-function,no-nested-ternary */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { breakpoints } from '../../utils/breakpoints';
import { setActiveBreakpoint } from './actions';

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.mediaQueryState = [];
  }

  componentDidMount() {
    Object.keys(breakpoints).forEach(key => {
      const query = window.matchMedia(`(max-width: ${breakpoints[key]}px)`);
      query.breakpoint = breakpoints[key];
      query.name = key;
      function breakpointChange() {
        this.dispatchActiveQuery();
      }
      query.addListener(breakpointChange.bind(this));
      this.mediaQueryState.push(query);
    });
  }
  dispatchActiveQuery() {
    const { dispatch } = this.props;
    const activeQuery = this.mediaQueryState.reduce(
      (prev, curr) =>
        curr.matches ? curr : prev && prev.matches ? prev : null,
    );
    const breakpointName = activeQuery ? activeQuery.name : 'default';
    const breakpointSize = activeQuery && activeQuery.breakpoint;
    dispatch(setActiveBreakpoint(breakpointName, breakpointSize));
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

AppWrapper.propTypes = {
  dispatch: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default connect()(AppWrapper);
