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
import config from 'config';
import { FormattedMessage, intlShape } from 'react-intl';
import moment from 'moment';
import { Link } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import LatestPanel from 'components/organisms/LatestPanel';
import TransactionAddressLink from 'components/TransactionAddressLink';
import {
  makeSelectLatestNodes,
  makeSelectLatestBlocks,
  makeSelectLatestTransactions,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  loadLatestBlocks,
  loadLatestNode,
  loadLatestsTransactions,
} from './actions';
import messages from './messages';
import { BlockexplorerWrapper } from './styled';
import { breakpointIsLessThan } from '../../utils/responsiveHelpers';
import { breakpoints } from '../../utils/breakpoints';
import StatusTableCell from '../../components/molecules/Table/IconCells/StatusTableCell';
import TypeTableCell from '../../components/molecules/Table/IconCells/TypeTableCell';

/* eslint-disable react/prefer-stateless-function */
export class BlockexplorerDashboardPage extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(loadLatestNode());
    this.props.dispatch(loadLatestBlocks());
    this.props.dispatch(loadLatestsTransactions());
  }

  render() {
    const { nodes, blocks, breakpoint, transactions } = this.props;
    const isMobile = breakpointIsLessThan(
      breakpoints.tabletLg,
      this.props.breakpoint.size,
    );

    const nodeColumnsMobile = {
      id: <FormattedMessage {...messages.nodeColumnId} />,
      balance: <FormattedMessage {...messages.nodeColumnBalance} />,
      status: <FormattedMessage {...messages.nodeColumnStatus} />,
    };
    const nodeColumnsDesktop = {
      id: <FormattedMessage {...messages.nodeColumnId} />,
      account_count: <FormattedMessage {...messages.nodeColumnAccountCount} />,
      msid: <FormattedMessage {...messages.nodeColumnMsid} />,
      balance: <FormattedMessage {...messages.nodeColumnBalance} />,
      status: <FormattedMessage {...messages.nodeColumnStatus} />,
    };
    const nodeColumns = isMobile ? nodeColumnsMobile : nodeColumnsDesktop;
    const blockColumnsMobile = {
      id: <FormattedMessage {...messages.blockColumnId} />,
      message_and_transaction_count: (
        <FormattedMessage {...messages.blockColumnMessageAndTransactionCount} />
      ),
      time: <FormattedMessage {...messages.blockColumnTime} />,
    };

    const blockColumns = {
      id: <FormattedMessage {...messages.blockColumnId} />,
      message_count: <FormattedMessage {...messages.blockColumnMessageCount} />,
      transaction_count: (
        <FormattedMessage {...messages.blockColumnTransactionCount} />
      ),
      time: <FormattedMessage {...messages.blockColumnTime} />,
    };

    const transactionColumns = {
      id: <FormattedMessage {...messages.transactionColumnId} />,
      block_id: <FormattedMessage {...messages.transactionColumnBlockId} />,
      message_id: <FormattedMessage {...messages.transactionColumnMessageId} />,
      sender_address: (
        <FormattedMessage {...messages.transactionColumnSenderAddress} />
      ),
      target_address: (
        <FormattedMessage {...messages.transactionColumnTargetAddress} />
      ),
      amount: <FormattedMessage {...messages.transactionColumnAmount} />,
      type: <FormattedMessage {...messages.transactionColumnType} />,
      time: <FormattedMessage {...messages.transactionColumnTime} />,
    };

    const transactionMobileColumns = {
      id: <FormattedMessage {...messages.transactionColumnId} />,
      block_id: <FormattedMessage {...messages.transactionColumnBlockId} />,
      sender_address: (
        <FormattedMessage {...messages.transactionColumnSenderAddress} />
      ),
      target_address: (
        <FormattedMessage {...messages.transactionColumnTargetAddress} />
      ),
      amount: <FormattedMessage {...messages.transactionColumnAmount} />,
      type: <FormattedMessage {...messages.transactionColumnType} />,
      time: <FormattedMessage {...messages.transactionColumnTime} />,
    };

    const nodeTab = {
      id: 'node',
      name: this.context.intl.formatMessage(messages.nodeTabTitle),
      link: '/blockexplorer/nodes',
      data: this.props.nodes.data,
      columns: nodeColumns,
      ceilConfiguration: {
        id: value => <Link to={`/blockexplorer/nodes/${value}`}>{value}</Link>,
        status: value => <StatusTableCell value={value} />,
      },
    };

    const blockTab = {
      id: 'block',
      name: this.context.intl.formatMessage(messages.blockTabTitle),
      link: '/blockexplorer/blocks',
      data: this.props.blocks.data,
      columns: isMobile ? blockColumnsMobile : blockColumns,
      ceilConfiguration: {
        id: value => <Link to={`/blockexplorer/blocks/${value}`}>{value}</Link>,
        time: value => moment(value).fromNow(),
      },
    };

    const transactionTab = {
      id: 'transaction',
      name: this.context.intl.formatMessage(messages.transactionTabTitle),
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
        time: value => moment(value).fromNow(),
        type: value => <TypeTableCell value={value} />,
      },
    };

    return (
      <BlockexplorerWrapper>
        <Helmet>
          <title>{this.context.intl.formatMessage(messages.metaTitle)}</title>
          <meta
            name="description"
            content={this.context.intl.formatMessage(messages.metaDescription)}
          />
        </Helmet>
        <LatestPanel
          gridArea="node"
          tableMinWidth={config.tablesMinWidth.tableXs}
          tabs={[nodeTab]}
          loading={nodes.loading}
          error={nodes.error}
          breakpoint={breakpoint}
        />
        <LatestPanel
          gridArea="block"
          tableMinWidth={config.tablesMinWidth.tableSm}
          tabs={[blockTab]}
          loading={blocks.loading}
          error={blocks.error}
          breakpoint={breakpoint}
        />
        <LatestPanel
          gridArea="latestTrans"
          tableMinWidth={config.tablesMinWidth.tableLg}
          tabs={[transactionTab]}
          loading={transactions.loading}
          error={transactions.error}
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
  blocks: PropTypes.object,
  transactions: PropTypes.object,
  breakpoint: PropTypes.object,
};

BlockexplorerDashboardPage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  nodes: makeSelectLatestNodes(),
  blocks: makeSelectLatestBlocks(),
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
