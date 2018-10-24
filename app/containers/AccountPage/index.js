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
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FormattedMessage, intlShape } from 'react-intl';
import config from 'config';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import DetailView from 'components/organisms/DetailView';
import ListView from 'components/organisms/ListView';
import TransactionAddressLink from 'components/TransactionAddressLink';
import { makeSelectAccount, makeSelectTransactions } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadAccount, loadTransactions } from './actions';
import { AccountPageWrapper } from './styled';
import messages from './messages';
import TypeTableCell from '../../components/molecules/Table/IconCells/TypeTableCell';
import StatusTableCell from '../../components/molecules/Table/IconCells/StatusTableCell';

/* eslint-disable react/prefer-stateless-function */
export class AccountPage extends React.PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      this.props.dispatch(loadAccount(id));
    }
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;
    if (prevProps.match.params.id !== id) {
      this.props.dispatch(loadAccount(id));
      this.props.dispatch(loadTransactions(id, config.limit + 1, 0));
    }
  }

  render() {
    const { id } = this.props.match.params;
    const nodeId =
      this.props.match.params.nodeId || this.props.account.data.node_id;
    const accountConfig = {
      columns: {
        id: <FormattedMessage {...messages.fieldId} />,
        balance: <FormattedMessage {...messages.fieldBalance} />,
        status: <FormattedMessage {...messages.fieldStatus} />,
        public_key: <FormattedMessage {...messages.fieldPublicKey} />,
        local_change: <FormattedMessage {...messages.fieldLocalChange} />,
        time: <FormattedMessage {...messages.fieldTime} />,
      },
      data: this.props.account.data,
      ceilConfiguration: {
        time: () => (
          <div title={accountConfig.data.time}>
            {moment(accountConfig.data.time).fromNow()}
          </div>
        ),
        local_change: () => (
          <div title={accountConfig.data.time}>
            {moment(accountConfig.data.time).fromNow()}
          </div>
        ),
        status: value => <StatusTableCell value={value} showDesc />,
      },
    };

    const columns = {
      id: <FormattedMessage {...messages.columnId} />,
      block_id: <FormattedMessage {...messages.columnBlockId} />,
      message_id: <FormattedMessage {...messages.columnMessageId} />,
      address: <FormattedMessage {...messages.columnAddress} />,
      amount: <FormattedMessage {...messages.columnAmount} />,
      type: <FormattedMessage {...messages.columnType} />,
      time: <FormattedMessage {...messages.columnTime} />,
    };

    const link = `/blockexplorer/nodes/${nodeId}/accounts/${id}/transactions`;

    const ceilConfiguration = {
      id: value => <Link to={`${link}/${value}`}>{value}</Link>,
      block_id: value => (
        <Link to={`/blockexplorer/blocks/${value}`}>{value}</Link>
      ),
      message_id: (value, row) => (
        <Link to={`/blockexplorer/blocks/${row.block_id}/messages/${value}`}>
          {value}
        </Link>
      ),
      address: (value, row) => (
        <TransactionAddressLink
          transactionLink={link}
          transactionId={row.id}
          address={value}
        />
      ),
      type: (value, row) => (
        <TypeTableCell value={value} direction={row.direction} />
      ),
      time: (value, row) => (
        <div title={row.time}> {moment(row.time).fromNow()} </div>
      ),
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
          fields={accountConfig.columns}
          data={this.props.account.data}
          loading={this.props.account.loading}
          error={this.props.account.error}
          ceilConfiguration={accountConfig.ceilConfiguration}
        />
        <h4>
          <FormattedMessage {...messages.transactionTabTitle} />
        </h4>
        <ListView
          name="transactions"
          urlParams={this.props.match.params}
          query={this.props.location.search}
          list={this.props.transactions}
          columns={columns}
          ceilConfiguration={ceilConfiguration}
          sortingColumns={['id', 'block_id', 'type']}
          defaultSort="block_id"
          messages={messages}
          link={link}
          onPageChange={this.props.onPageChange}
          tableMinWidth={config.tablesMinWidth.tableLg}
          breakpoint={this.props.breakpoint}
        />
      </AccountPageWrapper>
    );
  }
}

AccountPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
  breakpoint: PropTypes.object,
};

AccountPage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
  transactions: makeSelectTransactions(),
  breakpoint: state => state.get('breakpoint'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onPageChange: (id, page, sort, order) => {
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

const withReducer = injectReducer({ key: 'accountPage', reducer });
const withSaga = injectSaga({ key: 'accountPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AccountPage);
