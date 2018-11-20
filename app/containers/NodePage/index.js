/**
 *
 * NodePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import formatDate from 'lib/formatDate';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import { FormattedMessage, intlShape } from 'react-intl';
import config from 'config';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import DetailView from 'components/organisms/DetailView';
import ListView from 'components/organisms/ListView';
import {
  makeSelectNode,
  makeSelectAccounts,
  makeSelectMessages,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadAccounts, loadNode, loadMessages } from './actions';
import { NodePageWrapper } from './styled';
import msg from './messages';
import { breakpointIsMobile } from '../../utils/responsiveHelpers';
import StatusTableCell from '../../components/molecules/Table/IconCells/StatusTableCell';

/* eslint-disable react/prefer-stateless-function */
export class NodePage extends React.PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      this.props.dispatch(loadNode(id));
    }
  }

  componentDidUpdate(prevProps) {
    const newId = this.props.match.params.id;
    const oldId = prevProps.match.params.id;
    if (oldId !== newId) {
      this.props.dispatch(loadNode(newId));
      this.props.dispatch(loadAccounts(newId));
      // this.props.dispatch(loadMessages(newId));
    }
  }

  render() {
    const { id } = this.props.match.params;
    const isMobile = breakpointIsMobile(this.props.breakpoint.size);

    const nodeConfig = {
      columns: {
        id: <FormattedMessage {...msg.fieldId} />,
        status: <FormattedMessage {...msg.fieldStatus} />,
        balance: <FormattedMessage {...msg.fieldBalance} />,
        account_count: <FormattedMessage {...msg.fieldAccountCount} />,
        message_count: <FormattedMessage {...msg.fieldMessageCount} />,
        transaction_count: <FormattedMessage {...msg.fieldTransactionCount} />,
        ipv4: <FormattedMessage {...msg.fieldIp} />,
        public_key: <FormattedMessage {...msg.fieldPublicKey} />,
        hash: <FormattedMessage {...msg.fieldHash} />,
        message_hash: <FormattedMessage {...msg.fieldMessageHash} />,
        version: <FormattedMessage {...msg.fieldVersion} />,
        mtim: <FormattedMessage {...msg.fieldMtim} />,
      },
      data: this.props.node.prettyData,
      ceilConfiguration: {
        status: () => (
          <StatusTableCell value={nodeConfig.data.status} showDesc />
        ),
        ipv4: () => (
          <span>
            {nodeConfig.data.ipv4}:{nodeConfig.data.port}
          </span>
        ),
        mtim: () => (
          <div title={nodeConfig.data.mtim}>
            {formatDate(nodeConfig.data.mtim)}
          </div>
        ),
      },
    };

    const accountTab = {
      columnsMobile: {
        id: this.context.intl.formatMessage(msg.accountColumnId),
        status: this.context.intl.formatMessage(msg.accountStatus),
        balance: this.context.intl.formatMessage(msg.accountBalance),
      },
      columns: {
        id: this.context.intl.formatMessage(msg.accountColumnId),
        status: this.context.intl.formatMessage(msg.accountStatus),
        public_key: this.context.intl.formatMessage(msg.accountPublicKey),
        balance: this.context.intl.formatMessage(msg.accountBalance),
        message_count: this.context.intl.formatMessage(msg.accountMessageCount),
        transaction_count: this.context.intl.formatMessage(
          msg.accountTransactionCount,
        ),
        local_change: this.context.intl.formatMessage(msg.accountLocalChange),
      },
      ceilConfiguration: {
        id: value => (
          <Link to={`/blockexplorer/nodes/${id}/accounts/${value}`}>
            {value}
          </Link>
        ),
        status: value => <StatusTableCell value={value} />,
        local_change: (value, row) => (
          <div title={row.local_change}>
            {moment(row.local_change).fromNow()}
          </div>
        ),
      },
      sortingColumns: [
        'id',
        'balance',
        'message_count',
        'transaction_count',
        'local_change',
      ],
    };

    const messageTab = {
      columnsMobile: {
        id: <FormattedMessage {...msg.messageColumnId} />,
        transaction_count: (
          <FormattedMessage {...msg.messageTransactionCount} />
        ),
        time: <FormattedMessage {...msg.messageTime} />,
      },
      columns: {
        id: <FormattedMessage {...msg.messageColumnId} />,
        hash: <FormattedMessage {...msg.messageHash} />,
        transaction_count: (
          <FormattedMessage {...msg.messageTransactionCount} />
        ),
        time: <FormattedMessage {...msg.messageTime} />,
      },
      ceilConfiguration: {
        id: value => (
          <Link to={`/blockexplorer/messages/${value}`}>{value}</Link>
        ),
        time: value => <div title={value}> {moment(value).fromNow()} </div>,
      },
      sortingColumns: ['id', 'node_id', 'transaction_count', 'time'],
    };

    const {
      node,
      match,
      location,
      accounts,
      messages,
      onAccountPageChange,
      onMessagePageChange,
      breakpoint,
    } = this.props;

    return (
      <NodePageWrapper>
        <Helmet>
          <title>
            {this.context.intl.formatMessage(msg.metaTitle, { id })}
          </title>
          <meta
            name="description"
            content={this.context.intl.formatMessage(msg.metaDescription, {
              id,
            })}
          />
        </Helmet>
        <h1>
          <FormattedMessage {...msg.header} /> #{id}
        </h1>
        <DetailView
          fields={nodeConfig.columns}
          data={nodeConfig.data}
          rawData={this.props.node.data}
          loading={node.loading}
          error={node.error}
          breakpoint={breakpoint}
          ceilConfiguration={nodeConfig.ceilConfiguration}
        />
        <h2>
          <FormattedMessage {...msg.accountTabTitle} />
        </h2>
        <ListView
          name="accounts"
          urlParams={match.params}
          query={location.search}
          list={accounts}
          columns={isMobile ? accountTab.columnsMobile : accountTab.columns}
          ceilConfiguration={accountTab.ceilConfiguration}
          sortingColumns={accountTab.sortingColumns}
          defaultSort="id"
          defaultOrder="asc"
          messages={msg}
          link={`/blockexplorer/nodes/${id}/accounts`}
          onPageChange={onAccountPageChange}
          breakpoint={breakpoint}
          tableMinWidth={config.tablesMinWidth.tableMd}
        />
        <ListView
          name="messages"
          urlParams={match.params}
          query={location.search}
          list={messages}
          columns={isMobile ? messageTab.columnsMobile : messageTab.columns}
          ceilConfiguration={messageTab.ceilConfiguration}
          sortingColumns={messageTab.sortingColumns}
          defaultSort="id"
          defaultOrder="asc"
          messages={msg}
          link={`/blockexplorer/nodes/${id}/messages`}
          onPageChange={onMessagePageChange}
          breakpoint={breakpoint}
          tableMinWidth={config.tablesMinWidth.tableMd}
        />
      </NodePageWrapper>
    );
  }
}

NodePage.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  node: PropTypes.object,
  accounts: PropTypes.object,
  messages: PropTypes.object,
  onAccountPageChange: PropTypes.func,
  onMessagePageChange: PropTypes.func,
  breakpoint: PropTypes.object,
};

NodePage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  node: makeSelectNode(),
  accounts: makeSelectAccounts(),
  messages: makeSelectMessages(),
  breakpoint: state => state.get('breakpoint'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onAccountPageChange: (id, page, sort, order) => {
      const offset = (page - 1) * config.limit;
      return dispatch(loadAccounts(id, config.limit + 1, offset, sort, order));
    },
    onMessagePageChange: (id, page, sort, order) => {
      const offset = (page - 1) * config.limit;
      return dispatch(loadMessages(id, config.limit + 1, offset, sort, order));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'nodePage', reducer });
const withSaga = injectSaga({ key: 'nodePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NodePage);
