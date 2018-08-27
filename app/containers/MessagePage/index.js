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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import DetailView from 'components/DetailView';
import LatestPanel from 'components/LatestPanel';
import { makeSelectMessage, makeSelectTransactions } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadMessage, loadTransactions } from './actions';
import { MessagePageWrapper } from './styled';

/* eslint-disable react/prefer-stateless-function */
export class MessagePage extends React.PureComponent {
  componentDidMount() {
    const id = this.props.match.params.messageId || this.props.match.params.id;

    if (id) {
      this.props.dispatch(loadMessage(id));
      this.props.dispatch(loadTransactions(id));
    }
  }
  render() {
    const id = this.props.match.params.messageId || this.props.match.params.id;

    const fields = {
      id: <FormattedMessage {...messages.fieldId} />,
      node_id: <FormattedMessage {...messages.fieldNodeId} />,
      block_id: <FormattedMessage {...messages.fieldBlockId} />,
      transaction_count: (
        <FormattedMessage {...messages.fieldTransactionCount} />
      ),
      length: <FormattedMessage {...messages.fieldLength} />,
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
        <LatestPanel
          tabs={[transactionTab]}
          loading={this.props.transactions.loading}
          error={this.props.transactions.error}
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
