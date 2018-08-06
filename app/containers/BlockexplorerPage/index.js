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
import Search from 'components/Search';
import Card from 'components/Card';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
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
import LatestPanel from '../../components/LatestPanel';

/* eslint-disable react/prefer-stateless-function */
export class Blockexplorer extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(loadLatestNode());
    this.props.dispatch(loadLatestBlocks());
    this.props.dispatch(loadLatestsTransactions());
  }

  render() {
    const nodeColumns = {
      id: 'Id',
      account_count: 'Accounts',
      msid: 'Messages count',
      balance: 'Balance',
      status: 'Status',
    };

    const blockColumns = {
      id: 'Id',
      message_count: 'Messages',
      transaction_count: 'Transactions',
      time: 'Time',
    };

    const transactionColumns = {
      id: 'Id',
      type: 'Type',
    };

    const nodeTab = {
      id: 'node',
      name: 'Nodes',
      link: 'blockexplorer/nodes',
      data: this.props.nodes.data,
      columns: nodeColumns,
    };

    const blockTab = {
      id: 'block',
      name: 'Blocks',
      link: '/blockexplorer/blocks',
      data: this.props.blocks.data,
      columns: blockColumns,
    };

    const transactionTab = {
      id: 'transaction',
      name: 'Transactions',
      link: '/blockexplorer/transactions',
      data: this.props.transactions.data,
      columns: transactionColumns,
    };

    return (
      <div>
        <Helmet>
          <title>Blockexplorer</title>
          <meta name="description" content="Description of Blockexplorer" />
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
