/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import BlockExplorerPage from 'containers/BlockexplorerPage/Loadable';
import NodesListPage from 'containers/NodesListPage/Loadable';
import NodePage from 'containers/NodePage/Loadable';
import BlockPage from 'containers/BlockPage/Loadable';
import AccountPage from 'containers/AccountPage/Loadable';
import TransactionPage from 'containers/TransactionPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';

export default function App() {
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/blockexplorer" component={BlockExplorerPage} />
        <Route exact path="/blockexplorer/nodes" component={NodesListPage} />
        <Route exact path="/blockexplorer/nodes/:page/:sort/:order" component={NodesListPage} /> {/* eslint-disable-line  prettier/prettier */}
        <Route exact path="/blockexplorer/nodes/:id([a-zA-Z0-9]{4})" component={NodePage} /> {/* eslint-disable-line  prettier/prettier */}
        <Route exact path="/blockexplorer/blocks" component={BlockPage} />
        <Route exact path="/blockexplorer/accounts/:id([a-zA-Z0-9]{4}-[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4})" component={AccountPage} /> {/* eslint-disable-line  prettier/prettier */}
        <Route exact path="/blockexplorer/transactions/:id([a-zA-Z0-9]{4}:[a-zA-Z0-9]{8}:[a-zA-Z0-9]{4})" component={TransactionPage} /> {/* eslint-disable-line  prettier/prettier */}
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
