/**
 *
 * TransactionAddressLink
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class TransactionAddressLink extends React.PureComponent {
  isMultiTransaction() {
    return Array.isArray(this.props.address) && this.props.address.length > 1;
  }

  getNodeId() {
    return this.props.address.split('-')[0];
  }

  render() {
    if (this.isMultiTransaction()) {
      return (
        <Link to={`${this.props.transactionLink}/${this.props.transactionId}`}>
          <strong>
            <FormattedMessage {...messages.multiTransaction} />
          </strong>
        </Link>
      );
    }

    if (this.props.address === '--') {
      return <span>{this.props.address}</span>;
    }

    return (
      <Link
        key={`link_${this.props.address}`}
        to={`/blockexplorer/nodes/${this.getNodeId()}/accounts/${
          this.props.address
        }`}
      >
        {this.props.address}
      </Link>
    );
  }
}

TransactionAddressLink.propTypes = {
  address: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  transactionLink: PropTypes.string.isRequired,
  transactionId: PropTypes.string.isRequired,
};

export default TransactionAddressLink;
