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
import { Link } from 'react-router-dom';
import Search from 'components/Search';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import LatestPanel from 'components/LatestPanel';
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

/* eslint-disable react/prefer-stateless-function */
export class Blockexplorer extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(loadLatestNode());
    this.props.dispatch(loadLatestBlocks());
    this.props.dispatch(loadLatestsTransactions());
  }

  render() {
    const nodeColumns = {
      id: <FormattedMessage {...messages.nodeColumnId} />,
      account_count: <FormattedMessage {...messages.nodeColumnAccountCount} />,
      msid: <FormattedMessage {...messages.nodeColumnMsid} />,
      balance: <FormattedMessage {...messages.nodeColumnBalance} />,
      status: <FormattedMessage {...messages.nodeColumnStatus} />,
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
      sender_fee: <FormattedMessage {...messages.transactionColumnSenderFee} />,
      size: <FormattedMessage {...messages.transactionColumnSize} />,
      type: <FormattedMessage {...messages.transactionColumnType} />,
      time: <FormattedMessage {...messages.transactionColumnTime} />,
    };

    const nodeTab = {
      id: 'node',
      name: this.context.intl.formatMessage(messages.nodeTabTitle),
      link: 'blockexplorer/nodes',
      data: this.props.nodes.data,
      columns: nodeColumns,
      ceilConfiguration: {
        id: value => <Link to={`blockexplorer/nodes/${value}`}>{value}</Link>,
      },
    };

    const blockTab = {
      id: 'block',
      name: this.context.intl.formatMessage(messages.blockTabTitle),
      link: '/blockexplorer/blocks',
      data: this.props.blocks.data,
      columns: blockColumns,
      ceilConfiguration: {
        id: value => <Link to={`blockexplorer/blocks/${value}`}>{value}</Link>,
      },
    };

    const transactionTab = {
      id: 'transaction',
      name: this.context.intl.formatMessage(messages.transactionTabTitle),
      link: '/blockexplorer/transactions',
      data: this.props.transactions.data,
      columns: transactionColumns,
      ceilConfiguration: {
        id: value => (
          <Link to={`blockexplorer/transactions/${value}`}>{value}</Link>
        ),
        block_id: value => (
          <Link to={`blockexplorer/blocks/${value}`}>{value}</Link>
        ),
        message_id: value => (
          <Link to={`blockexplorer/messages/${value}`}>{value}</Link>
        ),
      },
    };

    return (
      <div>
        <Helmet>
          <title>{this.context.intl.formatMessage(messages.metaTitle)}</title>
          <meta
            name="description"
            content={this.context.intl.formatMessage(messages.metaDescription)}
          />
        </Helmet>
        <div className="row">
          <div className="col-md-12 col-xs-12">
            <Search history={this.props.history} />
          </div>
        </div>
        <div className="row">
          <span className="col-md-5 col-xs-12">
            <LatestPanel
              tabs={[nodeTab]}
              loading={this.props.nodes.loading}
              error={this.props.nodes.error}
            />
          </span>
          <span className="col-md-1 col-xs-12" />
          <span className="col-md-6 col-xs-12">
            <LatestPanel
              tabs={[blockTab]}
              loading={this.props.blocks.loading}
              error={this.props.blocks.error}
            />
          </span>
        </div>
        <div className="row">
          <LatestPanel
            tabs={[transactionTab]}
            loading={this.props.transactions.loading}
            error={this.props.transactions.error}
          />
        </div>
      </div>
    );
  }
}

Blockexplorer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  nodes: PropTypes.object,
  blocks: PropTypes.object,
  transactions: PropTypes.object,
};

Blockexplorer.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  nodes: makeSelectLatestNodes(),
  blocks: makeSelectLatestBlocks(),
  transactions: makeSelectLatestTransactions(),
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

const withReducer = injectReducer({ key: 'blockexplorer', reducer });
const withSaga = injectSaga({ key: 'blockexplorer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Blockexplorer);
