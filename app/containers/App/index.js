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
import BlockExplorerDashboardPage from 'containers/BlockexplorerDashboardPage/Loadable';
import NodesListPage from 'containers/NodesListPage/Loadable';
import TransactionsListPage from 'containers/TransactionsListPage/Loadable';
import BlocksListPage from 'containers/BlocksListPage/Loadable';
import BlockPage from 'containers/BlockPage/Loadable';
import NodePage from 'containers/NodePage/Loadable';
import AccountsListPage from 'containers/AccountsListPage/Loadable';
import AccountPage from 'containers/AccountPage/Loadable';
import TransactionPage from 'containers/TransactionPage/Loadable';
import MessagesListPage from 'containers/MessagesListPage/Loadable';
import MessagePage from 'containers/MessagePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import HeaderWrapper from 'containers/HeaderWrapper/HeaderWrapper';
import config from 'config';
import { AppContainer } from './styled';
import { ContainerWrapper } from './containerWrapper';
import Breadcrumbs from '../../components/organisms/Breadcrumbs/index';
import { TEST_ENV_ACTIVE } from '../../utils/checkEnv';

export default function App() {
  return (
    <AppContainer testEnv={TEST_ENV_ACTIVE}>
      <HeaderWrapper />
      <Breadcrumbs mappedRoutes={config.routes} />
      <ContainerWrapper>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/blockexplorer"
            component={BlockExplorerDashboardPage}
          />
          <Route
            exact
            path="/blockexplorer/nodes/:nodeId([a-fA-F0-9]{4})/accounts/:accountId([a-fA-F0-9]{4}-[a-fA-F0-9]{8}-[a-fA-F0-9]{4})/transactions/:id([a-fA-F0-9]{4}:[a-fA-F0-9]{8}:[a-fA-F0-9]{4})"
            component={TransactionPage}
          />
          <Route
            exact
            path="/blockexplorer/nodes/:nodeId([a-fA-F0-9]{4})/accounts/:id([a-fA-F0-9]{4}-[a-fA-F0-9]{8}-[a-fA-F0-9]{4})"
            component={AccountPage}
          />
          <Route
            exact
            path="/blockexplorer/nodes/:id([a-fA-F0-9]{4})"
            component={NodePage}
          />
          <Route exact path="/blockexplorer/nodes" component={NodesListPage} />
          <Route
            exact
            path="/blockexplorer/nodes/:id([a-fA-F0-9]{4})/accounts"
            component={NodePage}
          />
          <Route
            exact
            path="/blockexplorer/blocks/:blockId([a-fA-F0-9]{8})/messages/:messageId([a-fA-F0-9]{4}:[a-fA-F0-9]{8})/transactions/:id([a-fA-F0-9]{4}:[a-fA-F0-9]{8}:[a-fA-F0-9]{4})"
            component={TransactionPage}
          />
          <Route
            exact
            path="/blockexplorer/blocks/:blockId([a-fA-F0-9]{8})/messages/:id([a-fA-F0-9]{4}:[a-fA-F0-9]{8})"
            component={MessagePage}
          />
          <Route
            exact
            path="/blockexplorer/blocks"
            component={BlocksListPage}
          />
          <Route
            exact
            path="/blockexplorer/blocks/:id([a-fA-F0-9]{8})"
            component={BlockPage}
          />

          <Route
            exact
            path="/blockexplorer/blocks/:id([a-fA-F0-9]{8})/messages"
            component={BlockPage}
          />
          <Route
            exact
            path="/blockexplorer/accounts"
            component={AccountsListPage}
          />
          <Route
            exact
            path="/blockexplorer/accounts/:id([a-fA-F0-9]{4}-[a-fA-F0-9]{8}-[a-fA-F0-9]{4})"
            component={AccountPage}
          />
          <Route
            exact
            path="/blockexplorer/accounts/:id([a-fA-F0-9]{4}-[a-fA-F0-9]{8}-[a-fA-F0-9]{4})/transactions"
            component={AccountPage}
          />
          <Route
            exact
            path="/blockexplorer/accounts/node/:id([a-fA-F0-9]{4})"
            component={AccountPage}
          />
          <Route
            exact
            path="/blockexplorer/transactions/:id([a-fA-F0-9]{4}:[a-fA-F0-9]{8}:[a-fA-F0-9]{4})"
            component={TransactionPage}
          />
          <Route
            exact
            path="/blockexplorer/transactions"
            component={TransactionsListPage}
          />
          <Route
            exact
            path="/blockexplorer/blocks/:blockId([a-fA-F0-9]{8})/messages/:id([a-fA-F0-9]{4}:[a-fA-F0-9]{8})/transactions"
            component={MessagePage}
          />
          <Route
            exact
            path="/blockexplorer/nodes/:nodeId([a-fA-F0-9]{4})/accounts/:id([a-fA-F0-9]{4}-[a-fA-F0-9]{8}-[a-fA-F0-9]{4})/transactions"
            component={AccountPage}
          />
          <Route
            exact
            path="/blockexplorer/messages"
            component={MessagesListPage}
          />
          <Route
            exact
            path="/blockexplorer/messages/:id([a-fA-F0-9]{4}:[a-fA-F0-9]{8})"
            component={MessagePage}
          />
          <Route
            exact
            path="/blockexplorer/messages/:id([a-fA-F0-9]{4}:[a-fA-F0-9]{8})/transactions"
            component={MessagePage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </ContainerWrapper>
    </AppContainer>
  );
}
