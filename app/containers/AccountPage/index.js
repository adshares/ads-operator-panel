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
import { FormattedMessage, intlShape } from 'react-intl';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import DetailView from 'components/DetailView';
import { makeSelectAccount, makeSelectTransactions } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadAccount, loadTransactions } from './actions';
import LatestPanel from '../../components/LatestPanel';
import { AccountPageWrapper } from './styled';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class AccountPage extends React.PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      this.props.dispatch(loadAccount(id));
      this.props.dispatch(loadTransactions(id));
    }
  }

  render() {
    const { id } = this.props.match.params;

    const fields = {
      id: <FormattedMessage {...messages.fieldId} />,
      balance: <FormattedMessage {...messages.fieldBalance} />,
      msid: <FormattedMessage {...messages.fieldMsid} />,
      status: <FormattedMessage {...messages.fieldStatus} />,
      time: <FormattedMessage {...messages.fieldTime} />,
    };

    const link = '/blockexplorer/transactions';
    const transactionTab = {
      id: 'transactions',
      name: <FormattedMessage {...messages.transactionTabTitle} />,
      data: this.props.transactions.data,
      columns: {
        id: <FormattedMessage {...messages.columnId} />,
        type: <FormattedMessage {...messages.columnType} />,
        sender_address: <FormattedMessage {...messages.columnSenderAddress} />,
        target_address: <FormattedMessage {...messages.columnTargetAddress} />,
        amount: <FormattedMessage {...messages.columnAmount} />,
        time: <FormattedMessage {...messages.columnTime} />,
      },
      ceilConfiguration: {
        id: value => <Link to={`${link}/${value}`}>{value}</Link>,
      },
    };

    const metaDescription = this.context.intl.formatMessage(
      messages.metaDescription,
      { id },
    );

    return (
      <AccountPageWrapper>
        <Helmet>
          <title>
            {this.context.intl.formatMessage(messages.metaTitle, { id })}
          </title>
          <meta name="description" content={metaDescription} />
        </Helmet>
        <h3>
          <FormattedMessage {...messages.header} /> #{id}
        </h3>
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

AccountPage.contextTypes = {
  intl: intlShape,
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
