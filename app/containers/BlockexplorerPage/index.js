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
import moment from 'moment';
import { FormattedMessage, intlShape } from 'react-intl';
import Search from 'components/organisms/Search';
import Card from 'components/Card';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import LatestPanel from 'components/organisms/LatestPanel';

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

    const ceilConfiguration = {
      time: value => moment(value).fromNow(),
    };

    const nodeTab = {
      id: 'node',
      name: this.context.intl.formatMessage(messages.nodeTabTitle),
      link: '/blockexplorer/nodes',
      data: this.props.nodes.data,
      columns: nodeColumns,
    };

    const blockTab = {
      id: 'block',
      name: this.context.intl.formatMessage(messages.blockTabTitle),
      link: '/blockexplorer/blocks',
      data: this.props.blocks.data,
      columns: blockColumns,
      ceilConfiguration,
    };

    const transactionTab = {
      id: 'transaction',
      name: this.context.intl.formatMessage(messages.transactionTabTitle),
      link: '/blockexplorer/transactions',
      data: this.props.transactions.data,
      columns: transactionColumns,
      ceilConfiguration,
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
          <Card />
          <Card />
        </div>
        <div className="row">
          <div className="col-md-12 col-xs-6">
            <Search />
          </div>
        </div>
        <div className="row">
          <LatestPanel
            tabs={[nodeTab, blockTab]}
            loading={this.props.blocks.loading || this.props.nodes.loading}
            error={this.props.blocks.error || this.props.nodes.error}
          />
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
