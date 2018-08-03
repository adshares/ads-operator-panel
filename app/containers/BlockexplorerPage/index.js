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
import { Link } from 'react-router-dom';
import TableDataSet from 'components/TableDataSet';

import Search from 'components/Search';
import Card from 'components/Card';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectBlockexplorer, makeSelectLatestNodes, makeSelectLatestBlocks } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadLatestBlock, loadLatestNode } from './actions';
import LatestPanel from '../../components/LatestPanel';

/* eslint-disable react/prefer-stateless-function */
export class Blockexplorer extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(loadLatestNode());
    this.props.dispatch(loadLatestBlock());
  }

  render() {
    const nodeColumns = {
      id: 'Id',
      account_count: 'Accounts',
      msid: 'Messages',
      balance: 'Balance',
      status: 'Status',
    };

    const blockColumns = {
      id: 'Id',
      message_count: 'Messages',
      transaction_count: 'Transactions',
      time: 'Time',
    };

    const nodeTab = {
      id: 'node',
      name: 'Node',
      link: 'link',
      data: this.props.latestNodes,
      columns: nodeColumns,
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
          {/*<LatestPanel data={this.props.latestNodes} type={'node'} onTabSelection={this.props.onLatestTabSelection}/>*/}
          <LatestPanel tabs={[nodeTab]} />
        </div>
        <div className="row">
          <ul className="nav">
            <li className="nav-item">
              <span>Latest transactions</span>
            </li>
            <li className="nav-item">
              <Link to="/blockexplorer/block">View all</Link>
            </li>
          </ul>
        </div>
        <TableDataSet name="transactions" columns={{}} data={[]} />
      </div>
    );
  }
}

Blockexplorer.propTypes = {
  latestNodes: PropTypes.any,
  onLatestTabSelection: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  blockexplorer: makeSelectBlockexplorer(),
  latestNodes: makeSelectLatestNodes(),
  latestBlocks: makeSelectLatestNodes(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLatestTabSelection: type => {
      if (type === 'nodes') {
        return dispatch(loadLatestNode());
      }

      return dispatch(loadLatestBlock());
    },
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
