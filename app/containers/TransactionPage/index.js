/**
 *
 * TransactionPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectTransaction } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadTransaction } from './actions';
import DetailView from '../../components/DetailView';

/* eslint-disable react/prefer-stateless-function */
export class TransactionPage extends React.PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.dispatch(loadTransaction(id));
    }
  }
  render() {
    const { id } = this.props.match.params;

    const fields = {
      id: <FormattedMessage {...messages.fieldId} />,
      block_id: <FormattedMessage {...messages.fieldBlockId} />,
      message_id: <FormattedMessage {...messages.fieldMessageId} />,
      sender_address: <FormattedMessage {...messages.fieldSenderAddress} />,
      target_address: <FormattedMessage {...messages.fieldTargetAddress} />,
      sender_fee: <FormattedMessage {...messages.fieldSenderFee} />,
      size: <FormattedMessage {...messages.fieldSize} />,
      type: <FormattedMessage {...messages.fieldType} />,
      time: <FormattedMessage {...messages.fieldTime} />,
    };

    const metaDescription = this.context.intl.formatMessage(
      messages.metaDescription,
      { id },
    );

    return (
      <div>
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
          data={this.props.transaction.data}
          loading={this.props.transaction.loading}
          error={this.props.transaction.error}
        />
      </div>
    );
  }
}

TransactionPage.propTypes = {
  match: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  transaction: makeSelectTransaction(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

TransactionPage.contextTypes = {
  intl: intlShape,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'transactionPage', reducer });
const withSaga = injectSaga({ key: 'transactionPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TransactionPage);
