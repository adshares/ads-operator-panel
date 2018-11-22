/**
 *
 * BlockPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import config from 'config';
import moment from 'moment';
import formatDate from 'lib/formatDate';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import DetailView from 'components/organisms/DetailView';
import TabListView from 'components/organisms/TabListView';
import TransactionAddressLink from 'components/TransactionAddressLink';
import TypeTableCell from 'components/molecules/Table/IconCells/TypeTableCell';
import {
  makeSelectBlock,
  makeSelectMessages,
  makeSelectTransactions,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import msg from './messages';
import { BlockPageWrapper } from './styled';
import { loadBlock, loadMessages, loadTransactions } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class BlockPage extends React.PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.dispatch(loadBlock(id));
    }
  }

  componentDidUpdate(prevProps) {
    const newId = this.props.match.params.id;
    const oldId = prevProps.match.params.id;
    if (oldId !== newId) {
      this.props.dispatch(loadBlock(newId));
      this.props.dispatch(loadMessages(newId));
      this.props.dispatch(loadTransactions(newId));
    }
  }

  render() {
    const { id, tab } = this.props.match.params;

    const blockConfig = {
      columns: {
        id: <FormattedMessage {...msg.fieldId} />,
        votes: <FormattedMessage {...msg.fieldVotes} />,
        message_count: <FormattedMessage {...msg.fieldMessageCount} />,
        transaction_count: <FormattedMessage {...msg.fieldTransactionCount} />,
        old_hash: <FormattedMessage {...msg.fieldOldHash} />,
        now_hash: <FormattedMessage {...msg.fieldNowHash} />,
        msg_hash: <FormattedMessage {...msg.fieldMsgHash} />,
        vip_hash: <FormattedMessage {...msg.fieldVipHash} />,
        time: <FormattedMessage {...msg.fieldTime} />,
        end_time: <FormattedMessage {...msg.fieldEndTime} />,
      },
      data: this.props.block.prettyData,
      ceilConfiguration: {
        time: () => (
          <div title={blockConfig.data.time}>
            {formatDate(blockConfig.data.time)}
          </div>
        ),
        end_time: () => (
          <div title={blockConfig.data.end_time}>
            {formatDate(blockConfig.data.end_time)}
          </div>
        ),
        votes: () => (
          <div title={msg.fieldVotesTitle.defaultMessage}>
            {blockConfig.data.votes}
          </div>
        ),
      },
    };

    const {
      block,
      match,
      location,
      history,
      messages,
      transactions,
      onMessagesPageChange,
      onTransactionsPageChange,
      breakpoint,
    } = this.props;

    const messagesTab = {
      id: `messages`,
      name: this.context.intl.formatMessage(msg.messagesTabTitle),
      list: messages,
      link: `/blockexplorer/blocks/${id}/messages`,
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
        node_id: <FormattedMessage {...msg.messagesNodeId} />,
        transaction_count: (
          <FormattedMessage {...msg.messagesTransactionCount} />
        ),
        time: <FormattedMessage {...msg.messagesTime} />,
      },
      ceilConfiguration: {
        id: value => (
          <Link to={`/blockexplorer/messages/${value}`}>{value}</Link>
        ),
        node_id: value => (
          <Link to={`/blockexplorer/nodes/${value}`}>{value}</Link>
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
      link: `/blockexplorer/blocks/${id}/transactions`,
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
        node_id: <FormattedMessage {...msg.transactionsNodeId} />,
        message_id: <FormattedMessage {...msg.transactionsMessageId} />,
        time: <FormattedMessage {...msg.transactionsTime} />,
      },
      ceilConfiguration: {
        id: value => (
          <Link to={`/blockexplorer/transactions/${value}`}>{value}</Link>
        ),
        node_id: value => (
          <Link to={`/blockexplorer/nodes/${value}`}>{value}</Link>
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
      <BlockPageWrapper>
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
          fields={blockConfig.columns}
          data={blockConfig.data}
          rawData={block.data}
          loading={block.loading}
          error={block.error}
          ceilConfiguration={blockConfig.ceilConfiguration}
        />
        <TabListView
          tabs={[transactionsTab, messagesTab]}
          defaultTab={tab}
          urlParams={match.params}
          query={location.search}
          history={history}
          breakpoint={breakpoint}
          tableMinWidth={config.tablesMinWidth.tableMd}
        />
      </BlockPageWrapper>
    );
  }
}

BlockPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  block: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  transactions: PropTypes.object,
  onMessagesPageChange: PropTypes.func,
  onTransactionsPageChange: PropTypes.func,
  breakpoint: PropTypes.object,
};

BlockPage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  block: makeSelectBlock(),
  messages: makeSelectMessages(),
  transactions: makeSelectTransactions(),
  breakpoint: state => state.get('breakpoint'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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

const withReducer = injectReducer({ key: 'blockPage', reducer });
const withSaga = injectSaga({ key: 'blockPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BlockPage);
