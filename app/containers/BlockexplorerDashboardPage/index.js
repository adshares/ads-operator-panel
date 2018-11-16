/**
 *
 * BlockExplorerPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage, intlShape } from 'react-intl';
import moment from 'moment';
import { Link } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import LatestPanel from 'components/organisms/LatestPanel';
import TransactionAddressLink from 'components/TransactionAddressLink';
import {
  makeSelectTopNodes,
  makeSelectTopAccounts,
  makeSelectLatestBlocks,
  makeSelectLatestMessages,
  makeSelectLatestTransactions,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  loadTopNodes,
  loadTopAccounts,
  loadLatestBlocks,
  loadLatestsMessages,
  loadLatestsTransactions,
} from './actions';
import msg from './messages';
import { BlockexplorerWrapper } from './styled';
import { breakpointIsMobile } from '../../utils/responsiveHelpers';
import StatusTableCell from '../../components/molecules/Table/IconCells/StatusTableCell';
import TypeTableCell from '../../components/molecules/Table/IconCells/TypeTableCell';

/* eslint-disable react/prefer-stateless-function */
export class BlockexplorerDashboardPage extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(loadTopNodes());
    this.props.dispatch(loadTopAccounts());
    this.props.dispatch(loadLatestBlocks());
    this.props.dispatch(loadLatestsMessages());
    this.props.dispatch(loadLatestsTransactions());
  }

  render() {
    const {
      nodes,
      accounts,
      transactions,
      messages,
      blocks,
      breakpoint,
    } = this.props;
    const isMobile = breakpointIsMobile(this.props.breakpoint.size);

    const nodeColumnsMobile = {
      id: <FormattedMessage {...msg.nodeColumnId} />,
      status: <FormattedMessage {...msg.nodeColumnStatus} />,
      balance: <FormattedMessage {...msg.nodeColumnBalance} />,
    };

    const nodeColumnsDesktop = {
      id: <FormattedMessage {...msg.nodeColumnId} />,
      status: <FormattedMessage {...msg.nodeColumnStatus} />,
      balance: <FormattedMessage {...msg.nodeColumnBalance} />,
      account_count: <FormattedMessage {...msg.nodeColumnAccountCount} />,
      message_count: <FormattedMessage {...msg.nodeColumnMessageCount} />,
      transaction_count: (
        <FormattedMessage {...msg.nodeColumnTransactionCount} />
      ),
    };

    const accountColumnsMobile = {
      id: <FormattedMessage {...msg.accountColumnId} />,
      status: <FormattedMessage {...msg.accountColumnStatus} />,
      balance: <FormattedMessage {...msg.accountColumnBalance} />,
    };

    const accountColumnsDesktop = {
      id: <FormattedMessage {...msg.accountColumnId} />,
      status: <FormattedMessage {...msg.accountColumnStatus} />,
      balance: <FormattedMessage {...msg.accountColumnBalance} />,
      message_count: <FormattedMessage {...msg.accountColumnMessageCount} />,
      transaction_count: (
        <FormattedMessage {...msg.accountColumnTransactionCount} />
      ),
    };

    const blockColumnsMobile = {
      id: <FormattedMessage {...msg.blockColumnId} />,
      message_and_transaction_count: (
        <FormattedMessage {...msg.blockColumnMessageAndTransactionCount} />
      ),
      time: <FormattedMessage {...msg.blockColumnTime} />,
    };

    const blockColumns = {
      id: <FormattedMessage {...msg.blockColumnId} />,
      votes: <FormattedMessage {...msg.blockColumnVotes} />,
      message_count: <FormattedMessage {...msg.blockColumnMessageCount} />,
      transaction_count: (
        <FormattedMessage {...msg.blockColumnTransactionCount} />
      ),
      time: <FormattedMessage {...msg.blockColumnTime} />,
    };

    const messageColumnsMobile = {
      id: <FormattedMessage {...msg.messageColumnId} />,
      transaction_count: (
        <FormattedMessage {...msg.messageColumnTransactionCount} />
      ),
      time: <FormattedMessage {...msg.messageColumnTime} />,
    };

    const messageColumns = {
      id: <FormattedMessage {...msg.messageColumnId} />,
      node_id: <FormattedMessage {...msg.messageColumnNodeId} />,
      block_id: <FormattedMessage {...msg.messageColumnBlockId} />,
      transaction_count: (
        <FormattedMessage {...msg.messageColumnTransactionCount} />
      ),
      time: <FormattedMessage {...msg.messageColumnTime} />,
    };

    const transactionColumns = {
      id: <FormattedMessage {...msg.transactionColumnId} />,
      type: <FormattedMessage {...msg.transactionColumnType} />,
      sender_address: (
        <FormattedMessage {...msg.transactionColumnSenderAddress} />
      ),
      target_address: (
        <FormattedMessage {...msg.transactionColumnTargetAddress} />
      ),
      amount: <FormattedMessage {...msg.transactionColumnAmount} />,
      time: <FormattedMessage {...msg.transactionColumnTime} />,
    };

    const transactionMobileColumns = {
      id: <FormattedMessage {...msg.transactionColumnId} />,
      type: <FormattedMessage {...msg.transactionColumnType} />,
      sender_address: (
        <FormattedMessage {...msg.transactionColumnSenderAddress} />
      ),
      target_address: (
        <FormattedMessage {...msg.transactionColumnTargetAddress} />
      ),
      amount: <FormattedMessage {...msg.transactionColumnAmount} />,
      time: <FormattedMessage {...msg.transactionColumnTime} />,
    };

    const nodeTab = {
      id: 'node',
      name: this.context.intl.formatMessage(msg.nodeTabTitle),
      link: '/blockexplorer/nodes',
      data: this.props.nodes.data,
      columns: isMobile ? nodeColumnsMobile : nodeColumnsDesktop,
      ceilConfiguration: {
        id: value => <Link to={`/blockexplorer/nodes/${value}`}>{value}</Link>,
        status: value => <StatusTableCell value={value} />,
      },
    };

    const accountTab = {
      id: 'account',
      name: this.context.intl.formatMessage(msg.accountTabTitle),
      // link: '/blockexplorer/accounts',
      link: null,
      data: this.props.accounts.data,
      columns: isMobile ? accountColumnsMobile : accountColumnsDesktop,
      ceilConfiguration: {
        id: value => (
          <Link to={`/blockexplorer/accounts/${value}`}>{value}</Link>
        ),
        status: value => <StatusTableCell value={value} />,
      },
    };

    const blockTab = {
      id: 'block',
      name: this.context.intl.formatMessage(msg.blockTabTitle),
      link: '/blockexplorer/blocks',
      data: this.props.blocks.data,
      columns: isMobile ? blockColumnsMobile : blockColumns,
      ceilConfiguration: {
        id: value => <Link to={`/blockexplorer/blocks/${value}`}>{value}</Link>,
        time: value => <div title={value}> {moment(value).fromNow()} </div>,
      },
    };

    const messagesTab = {
      id: 'message',
      name: this.context.intl.formatMessage(msg.messageTabTitle),
      link: '/blockexplorer/messages',
      data: this.props.messages.data,
      columns: isMobile ? messageColumnsMobile : messageColumns,
      ceilConfiguration: {
        id: value => (
          <Link to={`/blockexplorer/messages/${value}`}>{value}</Link>
        ),
        node_id: value => (
          <Link to={`/blockexplorer/nodes/${value}`}>{value}</Link>
        ),
        block_id: value => (
          <Link to={`/blockexplorer/blocks/${value}`}>{value}</Link>
        ),
        time: value => <div title={value}> {moment(value).fromNow()} </div>,
      },
    };

    const transactionTab = {
      id: 'transaction',
      name: this.context.intl.formatMessage(msg.transactionTabTitle),
      link: '/blockexplorer/transactions',
      data: this.props.transactions.data,
      columns: isMobile ? transactionMobileColumns : transactionColumns,
      ceilConfiguration: {
        id: value => (
          <Link to={`/blockexplorer/transactions/${value}`}>{value}</Link>
        ),
        block_id: value => (
          <Link to={`/blockexplorer/blocks/${value}`}>{value}</Link>
        ),
        message_id: (value, row) => (
          <Link to={`/blockexplorer/blocks/${row.block_id}/messages/${value}`}>
            {value}
          </Link>
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
        time: value => <div title={value}> {moment(value).fromNow()} </div>,
        type: value => <TypeTableCell value={value} />,
      },
    };

    return (
      <BlockexplorerWrapper>
        <Helmet>
          <title>{this.context.intl.formatMessage(msg.metaTitle)}</title>
          <meta
            name="description"
            content={this.context.intl.formatMessage(msg.metaDescription)}
          />
        </Helmet>
        <LatestPanel
          gridArea="latest"
          tabs={[transactionTab, messagesTab, blockTab]}
          loading={transactions.loading || messages.loading || blocks.loading}
          error={transactions.error || messages.error || blocks.error}
          breakpoint={breakpoint}
        />
        <LatestPanel
          gridArea="inventory"
          tabs={[nodeTab, accountTab]}
          loading={nodes.loading || accounts.loading}
          error={nodes.error || accounts.error}
          breakpoint={breakpoint}
        />
      </BlockexplorerWrapper>
    );
  }
}

BlockexplorerDashboardPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  nodes: PropTypes.object,
  accounts: PropTypes.object,
  blocks: PropTypes.object,
  messages: PropTypes.object,
  transactions: PropTypes.object,
  breakpoint: PropTypes.object,
};

BlockexplorerDashboardPage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  nodes: makeSelectTopNodes(),
  accounts: makeSelectTopAccounts(),
  blocks: makeSelectLatestBlocks(),
  messages: makeSelectLatestMessages(),
  transactions: makeSelectLatestTransactions(),
  breakpoint: state => state.get('breakpoint'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'blockexplorerDashboardPage',
  reducer,
});
const withSaga = injectSaga({ key: 'blockexplorerDashboardPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BlockexplorerDashboardPage);
