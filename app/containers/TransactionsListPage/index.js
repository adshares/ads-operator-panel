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
import { Helmet } from 'react-helmet';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import config from 'config';
import ListView from 'components/ListView';
import { makeSelectTransactions } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadTransactions } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class TransactionsListPage extends React.PureComponent {
  render() {
    const columns = {
      id: <FormattedMessage {...messages.columnId} />,
      block_id: <FormattedMessage {...messages.columnBlockId} />,
      message_id: <FormattedMessage {...messages.columnMessageId} />,
      sender_address: <FormattedMessage {...messages.columnSenderAddress} />,
      target_address: <FormattedMessage {...messages.columnTargetAddress} />,
      sender_fee: <FormattedMessage {...messages.columnSenderFee} />,
      size: <FormattedMessage {...messages.columnSize} />,
      type: <FormattedMessage {...messages.columnType} />,
      time: <FormattedMessage {...messages.columnTime} />,
    };

    const sortingColumns = ['id', 'block_id', 'type'];

    return (
      <div>
        <Helmet>
          <title>{this.context.intl.formatMessage(messages.metaTitle)}</title>
          <meta
            name="description"
            content={this.context.intl.formatMessage(messages.metaDescription)}
          />
        </Helmet>
        <h3>
          <FormattedMessage {...messages.header} />
        </h3>
        <ListView
          name="nodes"
          urlParams={this.props.match.params}
          list={this.props.transactions}
          columns={columns}
          sortingColumns={sortingColumns}
          defaultSort="block_id"
          messages={messages}
          link="/blockexplorer/transactions"
          onPageChange={this.props.onPageChange}
        />
      </div>
    );
  }
}

TransactionsListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  transactions: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

TransactionsListPage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  transactions: makeSelectTransactions(),
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
