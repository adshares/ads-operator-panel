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
import moment from 'moment';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import DetailView from 'components/organisms/DetailView';
import ListView from 'components/organisms/ListView';
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

  componentDidUpdate(prevProps) {
    const newId = this.props.match.params.id;
    const oldId = prevProps.match.params.id;
    if (oldId !== newId) {
      this.props.dispatch(loadBlock(newId));
      this.props.dispatch(loadMessages(newId));
    }
  }

  render() {
    const { id } = this.props.match.params;
    const blockData = {
      columns: {
        id: <FormattedMessage {...messages.fieldId} />,
        message_count: <FormattedMessage {...messages.fieldMessageCount} />,
        node_count: <FormattedMessage {...messages.fieldNodeCount} />,
        transaction_count: (
          <FormattedMessage {...messages.fieldTransactionCount} />
        ),
        dividend_balance: (
          <FormattedMessage {...messages.fieldDividendBalance} />
        ),
        dividend_pay: <FormattedMessage {...messages.fieldDividendPay} />,
        old_hash: <FormattedMessage {...messages.fieldOldHash} />,
        now_hash: <FormattedMessage {...messages.fieldNowHash} />,
        msg_hash: <FormattedMessage {...messages.fieldMsgHash} />,
        vip_hash: <FormattedMessage {...messages.fieldVipHash} />,
        time: <FormattedMessage {...messages.fieldTime} />,
      },
      ceilConfiguration: {
        time: value => moment(value).fromNow(),
      },
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
        node_id: value => (
          <Link to={`blockexplorer/nodes/${value}`}>{value}</Link>
        ),
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
          fields={blockData.columns}
          data={this.props.block.data}
          loading={this.props.block.loading}
          error={this.props.block.error}
          ceilConfiguration={blockData.ceilConfiguration}
        />
        <h4>
          <FormattedMessage {...messages.messageTabTitle} />
        </h4>
        <ListView
          name="messages"
          urlParams={this.props.match.params}
          query={this.props.location.search}
          list={this.props.messages}
          ceilConfiguration={messageTab.ceilConfiguration}
          columns={messageTab.columns}
          sortingColumns={['id']}
          defaultSort="id"
          messages={messages}
          link={`/blockexplorer/blocks/${id}/messages`}
          onPageChange={this.props.onPageChange}
          breakpoint={this.props.breakpoint}
        />
      </BlockPageWrapper>
    );
  }
}

BlockPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  block: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
  breakpoint: PropTypes.object,
};

BlockPage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  block: makeSelectBlock(),
  messages: makeSelectMessages(),
  breakpoint: state => state.get('breakpoint'),
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
