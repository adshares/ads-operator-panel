/**
 *
 * AccountPage
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
import { makeSelectAccount, makeSelectTransactions } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadAccount, loadTransactions } from './actions';
import LatestPanel from '../../components/LatestPanel';
import { AccountPageWrapper } from './styled';

/* eslint-disable react/prefer-stateless-function */
export class AccountPage extends React.PureComponent {
  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    if (params.id) {
      this.props.dispatch(loadAccount(params.id));
      this.props.dispatch(loadTransactions(params.id));
    }
  }

  render() {
    const {
      match: { params },
    } = this.props;

    const fields = {
      id: 'Id',
      balance: 'Balance',
      msid: 'Messages',
      status: 'Status',
      time: 'Time',
    };

    const link = '/blockexplorer/transactions';
    const transactionTab = {
      id: 'transactions',
      name: 'Transactions',
      data: this.props.transactions.data,
      columns: {
        id: 'Transaction Id',
        type: 'Type',
        sender_address: 'From',
        target_address: 'To',
        amount: 'Amount',
        time: 'Time',
      },
      ceilConfiguration: {
        id: value => <Link to={`${link}/${value}`}>{value}</Link>,
      },
    };

    return (
      <AccountPageWrapper>
        <Helmet>
          <title>AccountPage</title>
          <meta name="description" content="Description of AccountPage" />
        </Helmet>
        <h3>Account #{params.id}</h3>
        <DetailView
          fields={fields}
          data={this.props.account.data}
          loading={this.props.account.loading}
          error={this.props.account.error}
        />
        <LatestPanel
          tabs={[transactionTab]}
          loading={this.props.transactions.loading}
          error={this.props.transactions.error}
        />
      </AccountPageWrapper>
    );
  }
}

AccountPage.propTypes = {
  match: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
  transactions: makeSelectTransactions(),
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

const withReducer = injectReducer({ key: 'accountPage', reducer });
const withSaga = injectSaga({ key: 'accountPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AccountPage);
