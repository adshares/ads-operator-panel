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
import Breadcrumbs from 'components/Breadcrumbs';

import HomePage from 'containers/HomePage/Loadable';
import BlockExplorerPage from 'containers/BlockexplorerPage/Loadable';
import NodesListPage from 'containers/NodesListPage/Loadable';
import TransactionsListPage from 'containers/TransactionsListPage/Loadable';
import BlocksListPage from 'containers/BlocksListPage/Loadable';
import BlockPage from 'containers/BlockPage/Loadable';
import NodePage from 'containers/NodePage/Loadable';
import AccountPage from 'containers/AccountPage/Loadable';
import TransactionPage from 'containers/TransactionPage/Loadable';
import MessagePage from 'containers/MessagePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import config from 'config';
import { AppContainer } from './styled';

export default function App() {
  return (
    <AppContainer className="container">
      <Header />
      <Breadcrumbs mappedRoutes={config.routes} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/blockexplorer" component={BlockExplorerPage} />
        <Route
          exact
          path="/blockexplorer/nodes/:id([a-zA-Z0-9]{4})"
          component={NodePage}
        />
        <Route exact path="/blockexplorer/nodes" component={NodesListPage} />
        <Route
          exact
          path="/blockexplorer/nodes/:page/:sort/:order"
          component={NodesListPage}
        />
        <Route
          exact
          path="/blockexplorer/blocks/:id([a-zA-Z0-9]{8})/messages/:messageId([a-zA-Z0-9]{4}:[a-zA-Z0-9]{8})"
          component={MessagePage}
        />
        <Route exact path="/blockexplorer/blocks" component={BlocksListPage} />
        <Route
          exact
          path="/blockexplorer/blocks/:page/:sort/:order"
          component={BlocksListPage}
        />
        <Route
          exact
          path="/blockexplorer/blocks/:id([a-zA-Z0-9]{8})"
          component={BlockPage}
        />

        <Route
          exact
          path="/blockexplorer/blocks/:id([a-zA-Z0-9]{8})/messages/:page/:sort/:order"
          component={BlockPage}
        />
        <Route
          exact
          path="/blockexplorer/accounts/:id([a-zA-Z0-9]{4}-[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4})"
          component={AccountPage}
        />
        <Route
          exact
          path="/blockexplorer/accounts/node/:id([a-zA-Z0-9]{4})"
          component={AccountPage}
        />

        <Route
          exact
          path="/blockexplorer/transactions/:id([a-zA-Z0-9]{4}:[a-zA-Z0-9]{8}:[a-zA-Z0-9]{4})"
          component={TransactionPage}
        />
        <Route
          exact
          path="/blockexplorer/transactions"
          component={TransactionsListPage}
        />
        <Route
          exact
          path="/blockexplorer/transactions/:page/:sort/:order"
          component={TransactionsListPage}
        />
        <Route
          exact
          path="/blockexplorer/messages/:id([a-zA-Z0-9]{4}:[a-zA-Z0-9]{8})"
          component={MessagePage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </AppContainer>
  );
}
