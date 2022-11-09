/**
 *
 * NodePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import formatDate from 'lib/formatDate';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import { FormattedMessage, intlShape } from 'react-intl';
import config from 'config';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import DetailView from 'components/organisms/DetailView';
import TabListView from 'components/organisms/TabListView';
import TransactionAddressLink from 'components/TransactionAddressLink';
import TypeTableCell from 'components/molecules/Table/IconCells/TypeTableCell';
import StatusTableCell from 'components/molecules/Table/IconCells/StatusTableCell';
import {
  makeSelectNode,
  makeSelectAccounts,
  makeSelectMessages,
  makeSelectTransactions,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  loadNode,
  loadAccounts,
  loadMessages,
  loadTransactions,
} from './actions';
import { NodePageWrapper } from './styled';
import msg from './messages';

/* eslint-disable react/prefer-stateless-function */
export class NodePage extends React.PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      this.props.dispatch(loadNode(id));
    }
  }

  componentDidUpdate(prevProps) {
    const newId = this.props.match.params.id;
    const oldId = prevProps.match.params.id;
    if (oldId !== newId) {
      this.props.dispatch(loadNode(newId));
      this.props.dispatch(loadAccounts(newId));
      this.props.dispatch(loadMessages(newId));
      this.props.dispatch(loadTransactions(newId));
    }
  }

  render() {
    const { id, tab } = this.props.match.params;

    const nodeConfig = {
      columns: {
        id: <FormattedMessage {...msg.fieldId} />,
        status: <FormattedMessage {...msg.fieldStatus} />,
        balance: <FormattedMessage {...msg.fieldBalance} />,
        account_count: <FormattedMessage {...msg.fieldAccountCount} />,
        message_count: <FormattedMessage {...msg.fieldMessageCount} />,
        transaction_count: <FormattedMessage {...msg.fieldTransactionCount} />,
        ipv4: <FormattedMessage {...msg.fieldIp} />,
        public_key: <FormattedMessage {...msg.fieldPublicKey} />,
        hash: <FormattedMessage {...msg.fieldHash} />,
        message_hash: <FormattedMessage {...msg.fieldMessageHash} />,
        version: <FormattedMessage {...msg.fieldVersion} />,
        mtim: <FormattedMessage {...msg.fieldMtim} />,
      },
      data: this.props.node.prettyData,
      ceilConfiguration: {
        status: () => (
          <StatusTableCell
            value={nodeConfig.data.status}
            id={nodeConfig.data.id}
            showDesc
          />
        ),
        ipv4: () => (
          <span>
            {nodeConfig.data.ipv4}:{nodeConfig.data.port}
          </span>
        ),
        mtim: () => (
          <div title={nodeConfig.data.mtim}>
            {formatDate(nodeConfig.data.mtim)}
          </div>
        ),
      },
    };

    const {
      node,
      match,
      location,
      history,
      accounts,
      messages,
      transactions,
      onAccountsPageChange,
      onMessagesPageChange,
      onTransactionsPageChange,
      breakpoint,
    } = this.props;

    const accountsTab = {
      id: `accounts`,
      name: this.context.intl.formatMessage(msg.accountsTabTitle),
      list: accounts,
      link: `/blockexplorer/nodes/${id}/accounts`,
      onPageChange: onAccountsPageChange,
      columnsMobile: {
        id: this.context.intl.formatMessage(msg.accountsColumnId),
        status: this.context.intl.formatMessage(msg.accountsStatus),
        balance: this.context.intl.formatMessage(msg.accountsBalance),
      },
      columns: {
        id: this.context.intl.formatMessage(msg.accountsColumnId),
        status: this.context.intl.formatMessage(msg.accountsStatus),
        public_key: this.context.intl.formatMessage(msg.accountsPublicKey),
        balance: this.context.intl.formatMessage(msg.accountsBalance),
        message_count: this.context.intl.formatMessage(
          msg.accountsMessageCount,
        ),
        transaction_count: this.context.intl.formatMessage(
          msg.accountsTransactionCount,
        ),
        local_change: this.context.intl.formatMessage(msg.accountsLocalChange),
      },
      ceilConfiguration: {
        id: value => (
          <Link to={`/blockexplorer/nodes/${id}/accounts/${value}`}>
            {value}
          </Link>
        ),
        status: (value, row) => <StatusTableCell value={value} id={row.id} />,
        local_change: (value, row) => (
          <div title={row.local_change}>
            {moment(row.local_change).fromNow()}
          </div>
        ),
      },
      sortingColumns: [
        'id',
        'balance',
        'message_count',
        'transaction_count',
        'local_change',
      ],
      defaultSort: 'id',
      defaultOrder: 'asc',
    };

    const messagesTab = {
      id: `messages`,
      name: this.context.intl.formatMessage(msg.messagesTabTitle),
      list: messages,
      link: `/blockexplorer/nodes/${id}/messages`,
      onPageChange: onMessagesPageChange,
      columnsMobile: {
        id: <FormattedMessage {...msg.messagesColumnId} />,
        transaction_count: (
          <FormattedMessage {...msg.messagesTransactionCount} />
        ),
        time: <FormattedMessage {...msg.messagesTime} />,
      },
      columns: {
        id: <FormattedMessage {...msg.messagesColumnId} />,
        hash: <FormattedMessage {...msg.messagesHash} />,
        block_id: <FormattedMessage {...msg.messagesBlockId} />,
        transaction_count: (
          <FormattedMessage {...msg.messagesTransactionCount} />
        ),
        time: <FormattedMessage {...msg.messagesTime} />,
      },
      ceilConfiguration: {
        id: value => (
          <Link to={`/blockexplorer/messages/${value}`}>{value}</Link>
        ),
        block_id: value => (
          <Link to={`/blockexplorer/blocks/${value}`}>{value}</Link>
        ),
        time: value => <div title={value}> {moment(value).fromNow()} </div>,
      },
      sortingColumns: ['id', 'transaction_count', 'time'],
      defaultSort: 'time',
    };

    const transactionsTab = {
      id: `transactions`,
      name: this.context.intl.formatMessage(msg.transactionsTabTitle),
      list: transactions,
      link: `/blockexplorer/nodes/${id}/transactions`,
      onPageChange: onTransactionsPageChange,
      columnsMobile: {
        id: <FormattedMessage {...msg.transactionsColumnId} />,
        type: <FormattedMessage {...msg.transactionsType} />,
        sender_address: <FormattedMessage {...msg.transactionsSenderAddress} />,
        target_address: <FormattedMessage {...msg.transactionsTargetAddress} />,
        amount: <FormattedMessage {...msg.transactionsAmount} />,
        time: <FormattedMessage {...msg.transactionsTime} />,
      },
      columns: {
        id: <FormattedMessage {...msg.transactionsColumnId} />,
        type: <FormattedMessage {...msg.transactionsType} />,
        sender_address: <FormattedMessage {...msg.transactionsSenderAddress} />,
        target_address: <FormattedMessage {...msg.transactionsTargetAddress} />,
        amount: <FormattedMessage {...msg.transactionsAmount} />,
        block_id: <FormattedMessage {...msg.transactionsBlockId} />,
        message_id: <FormattedMessage {...msg.transactionsMessageId} />,
        time: <FormattedMessage {...msg.transactionsTime} />,
      },
      ceilConfiguration: {
        id: value => (
          <Link to={`/blockexplorer/transactions/${value}`}>{value}</Link>
        ),
        block_id: value => (
          <Link to={`/blockexplorer/blocks/${value}`}>{value}</Link>
        ),
        message_id: value => (
          <Link to={`/blockexplorer/messages/${value}`}>{value}</Link>
        ),
        sender_address: (value, row) => (
          <TransactionAddressLink
            transactionLink="/blockexplorer/transactions"
            transactionId={row.id}
            address={value}
          />
        ),
        target_address: (value, row) => (
          <TransactionAddressLink
            transactionLink="/blockexplorer/transactions"
            transactionId={row.id}
            address={value}
          />
        ),
        type: value => <TypeTableCell value={value} />,
        time: value => <div title={value}> {moment(value).fromNow()} </div>,
      },
      sortingColumns: [
        'id',
        'sender_address',
        'target_address',
        'amount',
        'block_id',
        'message_id',
        'type',
        'time',
      ],
      defaultSort: 'time',
    };

    return (
      <NodePageWrapper>
        <Helmet>
          <title>
            {this.context.intl.formatMessage(msg.metaTitle, { id })}
          </title>
          <meta
            name="description"
            content={this.context.intl.formatMessage(msg.metaDescription, {
              id,
            })}
          />
        </Helmet>
        <h1>
          <FormattedMessage {...msg.header} /> #{id}
        </h1>
        <DetailView
          fields={nodeConfig.columns}
          data={nodeConfig.data}
          rawData={this.props.node.data}
          loading={node.loading}
          error={node.error}
          breakpoint={breakpoint}
          ceilConfiguration={nodeConfig.ceilConfiguration}
        />
        <TabListView
          tabs={[accountsTab, transactionsTab, messagesTab]}
          defaultTab={tab}
          urlParams={match.params}
          query={location.search}
          history={history}
          breakpoint={breakpoint}
          tableMinWidth={config.tablesMinWidth.tableMd}
        />
      </NodePageWrapper>
    );
  }
}

NodePage.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  node: PropTypes.object,
  accounts: PropTypes.object,
  messages: PropTypes.object,
  transactions: PropTypes.object,
  onAccountsPageChange: PropTypes.func,
  onMessagesPageChange: PropTypes.func,
  onTransactionsPageChange: PropTypes.func,
  breakpoint: PropTypes.object,
};

NodePage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  node: makeSelectNode(),
  accounts: makeSelectAccounts(),
  messages: makeSelectMessages(),
  transactions: makeSelectTransactions(),
  breakpoint: state => state.get('breakpoint'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onAccountsPageChange: (id, page, sort, order) => {
      const offset = (page - 1) * config.limit;
      return dispatch(loadAccounts(id, config.limit + 1, offset, sort, order));
    },
    onMessagesPageChange: (id, page, sort, order) => {
      const offset = (page - 1) * config.limit;
      return dispatch(loadMessages(id, config.limit + 1, offset, sort, order));
    },
    onTransactionsPageChange: (id, page, sort, order) => {
      const offset = (page - 1) * config.limit;
      return dispatch(
        loadTransactions(id, config.limit + 1, offset, sort, order),
      );
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'nodePage', reducer });
const withSaga = injectSaga({ key: 'nodePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NodePage);
