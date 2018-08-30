/**
 *
 * MessagePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import config from 'config';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import DetailView from 'components/DetailView';
import ListView from 'components/ListView';
import TransactionAddressLink from 'components/TransactionAddressLink';
import { makeSelectMessage, makeSelectTransactions } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadMessage, loadTransactions } from './actions';
import { MessagePageWrapper } from './styled';

/* eslint-disable react/prefer-stateless-function */
export class MessagePage extends React.PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      this.props.dispatch(loadMessage(id));
    }
  }

  render() {
    const { id } = this.props.match.params;
    const { blockId } = this.props.match.params;

    const fields = {
      id: <FormattedMessage {...messages.fieldId} />,
      node_id: <FormattedMessage {...messages.fieldNodeId} />,
      block_id: <FormattedMessage {...messages.fieldBlockId} />,
      transaction_count: (
        <FormattedMessage {...messages.fieldTransactionCount} />
      ),
      length: <FormattedMessage {...messages.fieldLength} />,
    };

    const link = `/blockexplorer/blocks/${blockId}/messages/${id}/transactions`;

    const columns = {
      id: <FormattedMessage {...messages.columnId} />,
      sender_address: <FormattedMessage {...messages.columnSenderAddress} />,
      target_address: <FormattedMessage {...messages.columnTargetAddress} />,
      amount: <FormattedMessage {...messages.columnAmount} />,
      type: <FormattedMessage {...messages.columnType} />,
      time: <FormattedMessage {...messages.columnTime} />,
    };

    const ceilConfiguration = {
      id: value => <Link to={`${link}/${value}`}>{value}</Link>,
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
    };

    const metaDescription = this.context.intl.formatMessage(
      messages.metaDescription,
      { id },
    );

    return (
      <MessagePageWrapper>
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
          data={this.props.message.data}
          loading={this.props.message.loading}
          error={this.props.message.error}
        />
        <h4>
          <FormattedMessage {...messages.transactionTabTitle} />
        </h4>
        <ListView
          name="transactions"
          urlParams={this.props.match.params}
          list={this.props.transactions}
          columns={columns}
          sortingColumns={['id']}
          ceilConfiguration={ceilConfiguration}
          defaultSort="id"
          messages={messages}
          link={`/blockexplorer/blocks/${blockId}/messages/${id}/transactions`}
          onPageChange={this.props.onPageChange}
        />
      </MessagePageWrapper>
    );
  }
}

MessagePage.propTypes = {
  match: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

MessagePage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  message: makeSelectMessage(),
  transactions: makeSelectTransactions(),
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

const withReducer = injectReducer({ key: 'messagePage', reducer });
const withSaga = injectSaga({ key: 'messagePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MessagePage);
