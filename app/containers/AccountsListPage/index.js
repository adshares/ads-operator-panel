/**
 *
 * AccountsListPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import { Link } from 'react-router-dom';
import config from 'config';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ListView from 'components/organisms/ListView';
import { makeSelectAccounts } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadAccounts } from './actions';
import { breakpointIsMobile } from '../../utils/responsiveHelpers';
import StatusTableCell from '../../components/molecules/Table/IconCells/StatusTableCell';

/* eslint-disable react/prefer-stateless-function */
export class AccountsListPage extends React.PureComponent {
  render() {
    const columnsMobile = {
      id: this.context.intl.formatMessage(messages.columnId),
      status: this.context.intl.formatMessage(messages.columnStatus),
      balance: this.context.intl.formatMessage(messages.columnBalance),
    };

    const columns = {
      id: this.context.intl.formatMessage(messages.columnId),
      status: this.context.intl.formatMessage(messages.columnStatus),
      node_id: this.context.intl.formatMessage(messages.columnNodeId),
      public_key: this.context.intl.formatMessage(messages.columnPublicKey),
      balance: this.context.intl.formatMessage(messages.columnBalance),
      message_count: this.context.intl.formatMessage(
        messages.columnMessageCount,
      ),
      transaction_count: this.context.intl.formatMessage(
        messages.columnTransactionCount,
      ),
      local_change: this.context.intl.formatMessage(messages.columnLocalChange),
    };

    const ceilConfiguration = {
      id: (value, row) => (
        <Link to={`/blockexplorer/nodes/${row.node_id}/accounts/${value}`}>
          {value}
        </Link>
      ),
      status: value => <StatusTableCell value={value} />,
      node_id: value => (
        <Link to={`/blockexplorer/nodes/${value}`}>{value}</Link>
      ),
      local_change: (value, row) => (
        <div title={row.local_change}>{moment(row.local_change).fromNow()}</div>
      ),
    };

    const sortingColumns = [
      'id',
      'node_id',
      'balance',
      'message_count',
      'transaction_count',
      'local_change',
    ];
    const { match, location, accounts, onPageChange, breakpoint } = this.props;

    const isMobile = breakpointIsMobile(this.props.breakpoint.size);

    return (
      <div>
        <Helmet>
          <title>{this.context.intl.formatMessage(messages.metaTitle)}</title>
          <meta
            name="description"
            content={this.context.intl.formatMessage(messages.metaDescription)}
          />
        </Helmet>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <ListView
          name="accounts"
          urlParams={match.params}
          query={location.search}
          list={accounts}
          columns={isMobile ? columnsMobile : columns}
          sortingColumns={sortingColumns}
          defaultSort="id"
          defaultOrder="asc"
          messages={messages}
          link="/blockexplorer/accounts"
          onPageChange={onPageChange}
          tableMinWidth={config.tablesMinWidth.tableXs}
          ceilConfiguration={ceilConfiguration}
          breakpoint={breakpoint}
        />
      </div>
    );
  }
}

AccountsListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  location: PropTypes.object,
  accounts: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
  breakpoint: PropTypes.object,
};

AccountsListPage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  accounts: makeSelectAccounts(),
  breakpoint: state => state.get('breakpoint'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onPageChange: (page, sort, order) => {
      const offset = (page - 1) * config.limit;
      return dispatch(loadAccounts(config.limit + 1, offset, sort, order));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'accountsListPage', reducer });
const withSaga = injectSaga({ key: 'accountsListPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AccountsListPage);
