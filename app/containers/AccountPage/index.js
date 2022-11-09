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
import formatDate from 'lib/formatDate';
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
import TransactionIdCell from '../../components/molecules/Table/TransactionIdCell';
import { breakpointIsMobile } from '../../utils/responsiveHelpers';

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
        status: <FormattedMessage {...messages.fieldStatus} />,
        node_id: <FormattedMessage {...messages.fieldNodeId} />,
        balance: <FormattedMessage {...messages.fieldBalance} />,
        message_count: <FormattedMessage {...messages.fieldMessageCount} />,
        transaction_count: (
          <FormattedMessage {...messages.fieldTransactionCount} />
        ),
        public_key: <FormattedMessage {...messages.fieldPublicKey} />,
        hash: <FormattedMessage {...messages.fieldHash} />,
        local_change: <FormattedMessage {...messages.fieldLocalChange} />,
      },
      data: this.props.account.prettyData,
      ceilConfiguration: {
        local_change: () => (
          <div title={accountConfig.data.local_change}>
            {formatDate(accountConfig.data.local_change)}
          </div>
        ),
        status: () => (
          <StatusTableCell
            value={accountConfig.data.status}
            id={accountConfig.data.id}
            showDesc
          />
        ),
        node_id: () => (
          <Link to={`/blockexplorer/nodes/${accountConfig.data.node_id}`}>
            {accountConfig.data.node_id}
          </Link>
        ),
      },
    };

    const columnsMobile = {
      id: <FormattedMessage {...messages.columnId} />,
      type: <FormattedMessage {...messages.columnType} />,
      address: <FormattedMessage {...messages.columnAddress} />,
      amount: <FormattedMessage {...messages.columnAmount} />,
      time: <FormattedMessage {...messages.columnTime} />,
    };

    const columns = {
      id: <FormattedMessage {...messages.columnId} />,
      type: <FormattedMessage {...messages.columnType} />,
      address: <FormattedMessage {...messages.columnAddress} />,
      amount: <FormattedMessage {...messages.columnAmount} />,
      block_id: <FormattedMessage {...messages.columnBlockId} />,
      message_id: <FormattedMessage {...messages.columnMessageId} />,
      time: <FormattedMessage {...messages.columnTime} />,
    };

    const isMobile = breakpointIsMobile(this.props.breakpoint.size);
    const link = `/blockexplorer/nodes/${nodeId}/accounts/${id}/transactions`;

    const ceilConfiguration = {
      id: (value, row) => (
        <TransactionIdCell
          value={value}
          amount={parseFloat(row.amount)}
          direction={row.direction}
        />
      ),
      block_id: value => (
        <Link to={`/blockexplorer/blocks/${value}`}>{value}</Link>
      ),
      message_id: (value, row) =>
        value !== '--' ? (
          <Link to={`/blockexplorer/blocks/${row.block_id}/messages/${value}`}>
            {value}
          </Link>
        ) : (
          '--'
        ),
      amount: (value, row) => (
        <span
          className={
            row.direction === 'in' ? 'amount positive' : 'amount negative'
          }
        >
          {' '}
          {value}{' '}
        </span>
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

    const sortingColumns = [
      'id',
      'block_id',
      'message_id',
      'type',
      'amount',
      'time',
    ];

    return (
      <AccountPageWrapper>
        <Helmet>
          <title>
            {this.context.intl.formatMessage(messages.metaTitle, { id })}
          </title>
          <meta name="description" content={metaDescription} />
        </Helmet>
        <h1>
          <FormattedMessage {...messages.header} /> #{id}
        </h1>
        <DetailView
          fields={accountConfig.columns}
          data={accountConfig.data}
          rawData={this.props.account.data}
          loading={this.props.account.loading}
          error={this.props.account.error}
          ceilConfiguration={accountConfig.ceilConfiguration}
        />
        <h2>
          <FormattedMessage {...messages.transactionTabTitle} />
        </h2>
        <ListView
          name="transactions"
          urlParams={this.props.match.params}
          query={this.props.location.search}
          list={this.props.transactions}
          columns={isMobile ? columnsMobile : columns}
          ceilConfiguration={ceilConfiguration}
          sortingColumns={sortingColumns}
          defaultSort="time"
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
