/**
 *
 * BlockPage
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
import { makeSelectBlock, makeSelectMessages } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { BlockPageWrapper } from './styled';
import { loadBlock, loadMessages } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class BlockPage extends React.PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.dispatch(loadBlock(id));
    }
  }

  render() {
    const { id } = this.props.match.params;

    const fields = {
      id: <FormattedMessage {...messages.fieldId} />,
      message_count: <FormattedMessage {...messages.fieldMessageCount} />,
      node_count: <FormattedMessage {...messages.fieldNodeCount} />,
      transaction_count: (
        <FormattedMessage {...messages.fieldTransactionCount} />
      ),
      dividend_balance: <FormattedMessage {...messages.fieldDividendBalance} />,
      dividend_pay: <FormattedMessage {...messages.fieldDividendPay} />,
      time: <FormattedMessage {...messages.fieldTime} />,
    };

    const link = '/blockexplorer/messages';
    const messageTab = {
      id: 'messages',
      name: <FormattedMessage {...messages.messageTabTitle} />,
      data: this.props.messages.data,
      columns: {
        id: <FormattedMessage {...messages.columnMessagesId} />,
        node_id: <FormattedMessage {...messages.columnMessagesNodeId} />,
        transaction_count: (
          <FormattedMessage {...messages.columnMessagesTransactionCount} />
        ),
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
      <BlockPageWrapper>
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
          data={this.props.block.data}
          loading={this.props.block.loading}
          error={this.props.block.error}
        />
        <ListView
          name="messages"
          urlParams={this.props.match.params}
          list={this.props.messages}
          columns={messageTab.columns}
          sortingColumns={['id']}
          defaultSort="id"
          messages={messages}
          link={`/blockexplorer/blocks/${id}/messages`}
          onPageChange={this.props.onPageChange}
        />
      </BlockPageWrapper>
    );
  }
}

BlockPage.propTypes = {
  match: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  block: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

BlockPage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  block: makeSelectBlock(),
  messages: makeSelectMessages(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onPageChange: (id, page, sort, order) => {
      const offset = (page - 1) * config.limit;
      return dispatch(loadMessages(id, config.limit + 1, offset, sort, order));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'blockPage', reducer });
const withSaga = injectSaga({ key: 'blockPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BlockPage);
