/**
 *
 * TransactionPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import config from 'config';
import formatDate from 'lib/formatDate';
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
import DetailView from '../../components/organisms/DetailView';
import TypeTableCell from '../../components/molecules/Table/IconCells/TypeTableCell';
import { DecodedMessage } from '../../components/molecules/DecodedMessage';

/* eslint-disable react/prefer-stateless-function */
export class TransactionPage extends React.PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.dispatch(loadTransaction(id));
    }
  }

  componentDidUpdate(prevProps) {
    const newId = this.props.match.params.id;
    const oldId = prevProps.match.params.id;
    if (oldId !== newId) {
      this.props.dispatch(loadTransaction(newId));
    }
  }

  renderAccountLink(nodeId, address, amount) {
    const amountSpan =
      typeof amount === 'undefined' ? null : <span>&nbsp;({amount})</span>;

    return (
      <span key={address}>
        <Link to={`/blockexplorer/nodes/${nodeId}/accounts/${address}`}>
          {address}
        </Link>
        {amountSpan}
      </span>
    );
  }

  renderAccountLinks(transaction) {
    const links = [];

    if (transaction.type === 'send_many') {
      transaction.wires.forEach(wire => {
        if (links.length > 0) {
          links.push(<span>,&nbsp;</span>);
        }
        links.push(
          this.renderAccountLink(
            wire.target_node_id,
            wire.target_address,
            wire.amount,
          ),
        );
      });
    } else if (transaction.type === 'send_one') {
      links.push(
        this.renderAccountLink(
          transaction.target_node_id,
          transaction.target_address,
        ),
      );
    }

    return links;
  }

  render() {
    const { id } = this.props.match.params;

    const transactionConfig = {
      columns: {
        id: <FormattedMessage {...messages.fieldId} />,
        message_id: <FormattedMessage {...messages.fieldMessageId} />,
        node_id: <FormattedMessage {...messages.fieldNodeId} />,
        block_id: <FormattedMessage {...messages.fieldBlockId} />,
        type: <FormattedMessage {...messages.fieldType} />,
        sender_address: <FormattedMessage {...messages.fieldSenderAddress} />,
        target_address: <FormattedMessage {...messages.fieldTargetAddress} />,
        amount: <FormattedMessage {...messages.fieldAmount} />,
        sender_fee: <FormattedMessage {...messages.fieldSenderFee} />,
        size: <FormattedMessage {...messages.fieldSize} />,
        decoded_message: <FormattedMessage {...messages.fieldDecodedMessage} />,
        message: <FormattedMessage {...messages.fieldMessage} />,
        signature: <FormattedMessage {...messages.fieldSignature} />,
        time: <FormattedMessage {...messages.fieldTime} />,
      },
      data: this.props.transaction.prettyData,
      ceilConfiguration: {
        message_id: () => (
          <Link
            to={`/blockexplorer/blocks/${
              transactionConfig.data.block_id
            }/messages/${transactionConfig.data.message_id}`}
          >
            {transactionConfig.data.message_id}
          </Link>
        ),
        node_id: () => (
          <Link to={`/blockexplorer/nodes/${transactionConfig.data.node_id}`}>
            {transactionConfig.data.node_id}
          </Link>
        ),
        block_id: () => (
          <Link to={`/blockexplorer/blocks/${transactionConfig.data.block_id}`}>
            {transactionConfig.data.block_id}
          </Link>
        ),
        sender_address: () => (
          <span>
            {this.renderAccountLink(
              transactionConfig.data.node_id,
              transactionConfig.data.sender_address,
            )}
          </span>
        ),
        target_address: () => (
          <span>{this.renderAccountLinks(transactionConfig.data)}</span>
        ),
        type: () => (
          <TypeTableCell
            value={transactionConfig.data.type}
            showDesc
            message={transactionConfig.data.message}
          />
        ),
        decoded_message: () => (
          <DecodedMessage>
            {transactionConfig.data.decoded_message}
          </DecodedMessage>
        ),
        time: () => (
          <div title={transactionConfig.data.time}>
            {formatDate(transactionConfig.data.time)}
          </div>
        ),
      },
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
        <h1>
          <FormattedMessage {...messages.header} /> #{id}
        </h1>
        <DetailView
          fields={transactionConfig.columns}
          data={transactionConfig.data}
          rawData={this.props.transaction.data}
          ceilConfiguration={transactionConfig.ceilConfiguration}
          loading={this.props.transaction.loading}
          error={this.props.transaction.error}
          breakpoint={this.props.breakpoint}
          tableMinWidth={config.tablesMinWidth.tableLg}
        />
      </div>
    );
  }
}

TransactionPage.propTypes = {
  match: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired,
  breakpoint: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  transaction: makeSelectTransaction(),
  breakpoint: state => state.get('breakpoint'),
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
