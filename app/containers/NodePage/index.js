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
import { makeSelectAccounts, makeSelectNode } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadAccounts, loadNode } from './actions';
import { NodePageWrapper } from './styled';
import messages from './messages';
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
    }
  }

  render() {
    const { id } = this.props.match.params;

    const nodeConfig = {
      columns: {
        id: <FormattedMessage {...messages.fieldId} />,
        status: <FormattedMessage {...messages.fieldStatus} />,
        balance: <FormattedMessage {...messages.fieldBalance} />,
        account_count: <FormattedMessage {...messages.fieldAccountCount} />,
        message_count: <FormattedMessage {...messages.fieldMessageCount} />,
        transaction_count: (
          <FormattedMessage {...messages.fieldTransactionCount} />
        ),
        ipv4: <FormattedMessage {...messages.fieldIp} />,
        public_key: <FormattedMessage {...messages.fieldPublicKey} />,
        hash: <FormattedMessage {...messages.fieldHash} />,
        message_hash: <FormattedMessage {...messages.fieldMessageHash} />,
        version: <FormattedMessage {...messages.fieldVersion} />,
        mtim: <FormattedMessage {...messages.fieldMtim} />,
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

    const columnsMobile = {
      id: this.context.intl.formatMessage(messages.accountColumnId),
      status: this.context.intl.formatMessage(messages.accountStatus),
      balance: this.context.intl.formatMessage(messages.accountBalance),
      message_count: this.context.intl.formatMessage(
        messages.accountMessageCount,
      ),
      transaction_count: this.context.intl.formatMessage(
        messages.accountTransactionCount,
      ),
    };

    const columns = {
      id: this.context.intl.formatMessage(messages.accountColumnId),
      status: this.context.intl.formatMessage(messages.accountStatus),
      public_key: this.context.intl.formatMessage(messages.accountPublicKey),
      balance: this.context.intl.formatMessage(messages.accountBalance),
      message_count: this.context.intl.formatMessage(
        messages.accountMessageCount,
      ),
      transaction_count: this.context.intl.formatMessage(
        messages.accountTransactionCount,
      ),
      local_change: this.context.intl.formatMessage(
        messages.accountLocalChange,
      ),
    };

    const isMobile = breakpointIsMobile(this.props.breakpoint.size);

    const ceilConfiguration = {
      id: value => (
        <Link to={`/blockexplorer/nodes/${id}/accounts/${value}`}>{value}</Link>
      ),
      status: value => <StatusTableCell value={value} />,
      local_change: (value, row) => (
        <div title={row.local_change}>{moment(row.local_change).fromNow()}</div>
      ),
    };

    const metaDescription = this.context.intl.formatMessage(
      messages.metaDescription,
      { id },
    );
    const {
      node,
      match,
      location,
      accounts,
      onPageChange,
      breakpoint,
    } = this.props;

    const sortingColumns = [
      'id',
      'balance',
      'message_count',
      'transaction_count',
      'local_change',
    ];

    return (
      <NodePageWrapper>
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
          fields={nodeConfig.columns}
          data={nodeConfig.data}
          rawData={this.props.node.data}
          loading={node.loading}
          error={node.error}
          breakpoint={breakpoint}
          ceilConfiguration={nodeConfig.ceilConfiguration}
        />
        <h2>
          <FormattedMessage {...messages.accountTabTitle} />
        </h2>
        <ListView
          name="accounts"
          urlParams={match.params}
          query={location.search}
          list={accounts}
          columns={isMobile ? columnsMobile : columns}
          ceilConfiguration={ceilConfiguration}
          sortingColumns={sortingColumns}
          defaultSort="id"
          defaultOrder="desc"
          messages={messages}
          link={`/blockexplorer/nodes/${id}/accounts`}
          onPageChange={onPageChange}
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
  onPageChange: PropTypes.func,
  breakpoint: PropTypes.object,
};

NodePage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  node: makeSelectNode(),
  accounts: makeSelectAccounts(),
  breakpoint: state => state.get('breakpoint'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onPageChange: (id, page, sort, order) => {
      const offset = (page - 1) * config.limit;
      return dispatch(loadAccounts(id, config.limit + 1, offset, sort, order));
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
