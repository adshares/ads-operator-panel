/* eslint-disable */
import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Breadcrumbs from './Breadcrumbs';
import Breadcrumb from './Breadcrumb';
import BreadcrumbActive from './BreadcrumbActive';

const BreadcrumbsWrapper = props => (
  <Route
    path="/:path"
    render={rest => (
      <Breadcrumbs
        mappedRoutes={props.mappedRoutes}
        ActiveLinkComponent={props.ActiveLinkComponent}
        LinkComponent={props.LinkComponent}
        rootName={props.rootName}
        {...rest}
      />
    )}
  />
);

BreadcrumbsWrapper.defaultProps = {
  ActiveLinkComponent: props => (
    <BreadcrumbActive>{props.children}</BreadcrumbActive>
  ),
  LinkComponent: props => <Breadcrumb>{props.children}</Breadcrumb>,
  rootName: '',
};

BreadcrumbsWrapper.propTypes = {
  mappedRoutes: PropTypes.shape({}).isRequired,
  ActiveLinkComponent: PropTypes.func,
  LinkComponent: PropTypes.func,
  rootName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default BreadcrumbsWrapper;
