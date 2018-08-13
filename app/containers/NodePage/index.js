/**
 *
 * NodePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import DetailView from 'components/DetailView';
import { makeSelectAccounts, makeSelectNode } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadAccounts, loadNode } from './actions';
import { NodePageWrapper } from './styled';
import LatestPanel from '../../components/LatestPanel';

/* eslint-disable react/prefer-stateless-function */
export class NodePage extends React.PureComponent {
  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    if (params.id) {
      this.props.dispatch(loadNode(params.id));
      this.props.dispatch(loadAccounts(params.id));
    }
  }

  render() {
    const fields = {
      id: 'Id',
      account_count: 'Accounts',
      msid: 'Messages count',
      balance: 'Balance',
      status: 'Status',
    };

    const accountColumns = {
      id: 'Account Id',
      balance: 'Balance',
    };

    const link = '/blockexplorer/accounts';
    const accountTab = {
      id: 'account',
      name: 'Accounts',
      data: this.props.accounts.data,
      columns: accountColumns,
      ceilConfiguration: {
        id: value => <Link to={`${link}/${value}`}>{value}</Link>,
      },
    };

    const {
      match: { params },
    } = this.props;

    return (
      <NodePageWrapper>
        <Helmet>
          <title>Node #{params.id}</title>
          <meta name="description" content={`Node #${params.id}`} />
        </Helmet>
        <h3>Node #{params.id}</h3>
        <DetailView
          fields={fields}
          data={this.props.node.data}
          loading={this.props.node.loading}
          error={this.props.node.error}
        />
        <div className="row">
          <LatestPanel
            tabs={[accountTab]}
            loading={this.props.accounts.loading}
            error={this.props.accounts.error}
          />
        </div>
      </NodePageWrapper>
    );
  }
}

NodePage.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  node: PropTypes.object,
  accounts: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  node: makeSelectNode(),
  accounts: makeSelectAccounts(),
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

const withReducer = injectReducer({ key: 'nodePage', reducer });
const withSaga = injectSaga({ key: 'nodePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NodePage);
