/**
 *
 * SnapshotPage
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
import formatDate from 'lib/formatDate';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import DetailView from 'components/organisms/DetailView';
import TabListView from 'components/organisms/TabListView';
import StatusTableCell from '../../components/molecules/Table/IconCells/StatusTableCell';
import {
  makeSelectSnapshot,
  makeSelectNodes,
  makeSelectAccounts,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import msg from './messages';
import { SnapshotPageWrapper } from './styled';
import { loadSnapshot, loadNodes, loadAccounts } from './actions';
import LabelTableCell from '../../components/molecules/Table/IconCells/LabelTableCell';

/* eslint-disable react/prefer-stateless-function */
export class SnapshotPage extends React.PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.dispatch(loadSnapshot(id));
    }
  }

  componentDidUpdate(prevProps) {
    const newId = this.props.match.params.id;
    const oldId = prevProps.match.params.id;
    if (oldId !== newId) {
      this.props.dispatch(loadSnapshot(newId));
      this.props.dispatch(loadNodes(newId));
      this.props.dispatch(loadAccounts(newId));
    }
  }

  render() {
    const { id, tab } = this.props.match.params;

    const snapshotConfig = {
      columns: {
        id: <FormattedMessage {...msg.fieldId} />,
        time: <FormattedMessage {...msg.fieldTime} />,
      },
      data: this.props.snapshot.prettyData,
      ceilConfiguration: {
        time: () => (
          <div title={snapshotConfig.data.time}>
            {formatDate(snapshotConfig.data.time)}
          </div>
        ),
      },
    };

    const {
      snapshot,
      match,
      location,
      history,
      nodes,
      accounts,
      onNodesPageChange,
      onAccountsPageChange,
      breakpoint,
    } = this.props;

    const nodesTab = {
      id: `nodes`,
      name: this.context.intl.formatMessage(msg.nodesTabTitle),
      list: nodes,
      link: `/blockexplorer/snapshots/${id}/nodes`,
      onPageChange: onNodesPageChange,
      columnsMobile: {
        node_id: <FormattedMessage {...msg.nodesColumnId} />,
        status: <FormattedMessage {...msg.nodesStatus} />,
        balance: <FormattedMessage {...msg.nodesBalance} />,
      },
      columns: {
        node_id: <FormattedMessage {...msg.nodesColumnId} />,
        status: <FormattedMessage {...msg.nodesStatus} />,
        public_key: <FormattedMessage {...msg.nodesPublicKey} />,
        balance: <FormattedMessage {...msg.nodesBalance} />,
        account_count: <FormattedMessage {...msg.nodesAccountCount} />,
        message_count: <FormattedMessage {...msg.nodesMessageCount} />,
        transaction_count: <FormattedMessage {...msg.nodesTransactionCount} />,
        version: <FormattedMessage {...msg.nodesVersion} />,
      },
      ceilConfiguration: {
        node_id: value => (
          <Link to={`/blockexplorer/nodes/${value}`}>{value}</Link>
        ),
        status: value => <StatusTableCell value={value} />,
      },
      sortingColumns: [
        'node_id',
        'account_count',
        'balance',
        'message_count',
        'transaction_count',
        'version',
      ],
      defaultSort: 'node_id',
      defaultOrder: 'asc',
    };

    const accountsTab = {
      id: `accounts`,
      name: this.context.intl.formatMessage(msg.accountsTabTitle),
      list: accounts,
      link: `/blockexplorer/snapshots/${id}/accounts`,
      onPageChange: onAccountsPageChange,
      columnsMobile: {
        account_id: <FormattedMessage {...msg.accountsColumnId} />,
        status: <FormattedMessage {...msg.accountsStatus} />,
        balance: <FormattedMessage {...msg.accountsBalance} />,
      },
      columns: {
        account_id: <FormattedMessage {...msg.accountsColumnId} />,
        status: <FormattedMessage {...msg.accountsStatus} />,
        node_id: <FormattedMessage {...msg.accountsNodeId} />,
        public_key: <FormattedMessage {...msg.accountsPublicKey} />,
        balance: <FormattedMessage {...msg.accountsBalance} />,
        message_count: <FormattedMessage {...msg.accountsMessageCount} />,
        transaction_count: (
          <FormattedMessage {...msg.accountsTransactionCount} />
        ),
      },
      ceilConfiguration: {
        account_id: (value, row) => (
          <div>
            <Link to={`/blockexplorer/nodes/${row.node_id}/accounts/${value}`}>
              {value}
            </Link>
            <LabelTableCell value={row.label} icon={row.icon} />
          </div>
        ),
        status: value => <StatusTableCell value={value} />,
        node_id: value => (
          <Link to={`/blockexplorer/nodes/${value}`}>{value}</Link>
        ),
      },
      sortingColumns: [
        'account_id',
        'node_id',
        'balance',
        'message_count',
        'transaction_count',
      ],
      defaultSort: 'account_id',
      defaultOrder: 'asc',
    };

    return (
      <SnapshotPageWrapper>
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
          fields={snapshotConfig.columns}
          data={snapshotConfig.data}
          rawData={snapshot.data}
          loading={snapshot.loading}
          error={snapshot.error}
          ceilConfiguration={snapshotConfig.ceilConfiguration}
        />
        <TabListView
          tabs={[accountsTab, nodesTab]}
          defaultTab={tab}
          urlParams={match.params}
          query={location.search}
          history={history}
          breakpoint={breakpoint}
          tableMinWidth={config.tablesMinWidth.tableMd}
        />
      </SnapshotPageWrapper>
    );
  }
}

SnapshotPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  snapshot: PropTypes.object.isRequired,
  nodes: PropTypes.object.isRequired,
  accounts: PropTypes.object,
  onNodesPageChange: PropTypes.func,
  onAccountsPageChange: PropTypes.func,
  breakpoint: PropTypes.object,
};

SnapshotPage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  snapshot: makeSelectSnapshot(),
  nodes: makeSelectNodes(),
  accounts: makeSelectAccounts(),
  breakpoint: state => state.get('breakpoint'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onNodesPageChange: (id, page, sort, order) => {
      const offset = (page - 1) * config.limit;
      return dispatch(loadNodes(id, config.limit + 1, offset, sort, order));
    },
    onAccountsPageChange: (id, page, sort, order) => {
      const offset = (page - 1) * config.limit;
      return dispatch(loadAccounts(id, config.limit + 1, offset, sort, order));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'snapshotPage', reducer });
const withSaga = injectSaga({ key: 'snapshotPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SnapshotPage);
