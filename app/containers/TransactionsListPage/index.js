/**
 *
 * TransactionsListPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import config from 'config';
import ListView from 'components/organisms/ListView';
import TransactionAddressLink from 'components/TransactionAddressLink';
import { makeSelectTransactions } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadTransactions } from './actions';
import TypeTableCell from '../../components/molecules/Table/IconCells/TypeTableCell';
import { breakpointIsMobile } from '../../utils/responsiveHelpers';

/* eslint-disable react/prefer-stateless-function */
export class TransactionsListPage extends React.PureComponent {
  render() {
    const isMobile = breakpointIsMobile(this.props.breakpoint.size);

    const columnsMobile = {
      id: <FormattedMessage {...messages.columnId} />,
      type: <FormattedMessage {...messages.columnType} />,
      sender_address: <FormattedMessage {...messages.columnSenderAddress} />,
      target_address: <FormattedMessage {...messages.columnTargetAddress} />,
      amount: <FormattedMessage {...messages.columnAmount} />,
      time: <FormattedMessage {...messages.columnTime} />,
    };

    const columns = {
      id: <FormattedMessage {...messages.columnId} />,
      type: <FormattedMessage {...messages.columnType} />,
      sender_address: <FormattedMessage {...messages.columnSenderAddress} />,
      target_address: <FormattedMessage {...messages.columnTargetAddress} />,
      amount: <FormattedMessage {...messages.columnAmount} />,
      block_id: <FormattedMessage {...messages.columnBlockId} />,
      message_id: <FormattedMessage {...messages.columnMessageId} />,
      time: <FormattedMessage {...messages.columnTime} />,
    };

    const sortingColumns = [
      'id',
      'block_id',
      'message_id',
      'sender_address',
      'target_address',
      'amount',
      'type',
      'time',
    ];
    const ceilConfiguration = {
      id: value => {
        if (value.indexOf('dividend') > -1) {
          return 'staking';
        }
        return <Link to={`/blockexplorer/transactions/${value}`}>{value}</Link>;
      },
      block_id: value => (
        <Link to={`/blockexplorer/blocks/${value}`}>{value}</Link>
      ),
      message_id: (value, row) => (
        <Link to={`/blockexplorer/blocks/${row.block_id}/messages/${value}`}>
          {value}
        </Link>
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
      type: (value, row) => (
        <TypeTableCell value={value} direction={row.direction} />
      ),
      time: value => <div title={value}> {moment(value).fromNow()} </div>,
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
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <ListView
          name="nodes"
          urlParams={this.props.match.params}
          query={this.props.location.search}
          list={this.props.transactions}
          columns={isMobile ? columnsMobile : columns}
          sortingColumns={sortingColumns}
          ceilConfiguration={ceilConfiguration}
          defaultSort="time"
          messages={messages}
          link="/blockexplorer/transactions"
          onPageChange={this.props.onPageChange}
          tableMinWidth={config.tablesMinWidth.tableLg}
          breakpoint={this.props.breakpoint}
        />
      </div>
    );
  }
}

TransactionsListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  location: PropTypes.object,
  transactions: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
  breakpoint: PropTypes.object,
};

TransactionsListPage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  transactions: makeSelectTransactions(),
  breakpoint: state => state.get('breakpoint'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onPageChange: (page, sort, order) => {
      const offset = (page - 1) * config.limit;
      return dispatch(loadTransactions(config.limit + 1, offset, sort, order));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'transactionsListPage', reducer });
const withSaga = injectSaga({ key: 'transactionsListPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TransactionsListPage);
