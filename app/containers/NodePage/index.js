/**
 *
 * NodePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
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
        account_count: <FormattedMessage {...messages.fieldAccountCount} />,
        msid: <FormattedMessage {...messages.fieldMsid} />,
        balance: <FormattedMessage {...messages.fieldBalance} />,
        status: <FormattedMessage {...messages.fieldStatus} />,
        ipv4: <FormattedMessage {...messages.fieldIp} />,
        version: <FormattedMessage {...messages.fieldVersion} />,
        public_key: <FormattedMessage {...messages.fieldPublicKey} />,
        mtim: <FormattedMessage {...messages.fieldMtim} />,
      },
      data: this.props.node.data,
      ceilConfiguration: {
        status: () => (
          <StatusTableCell value={nodeConfig.data.status} showDesc />
        ),
        mtim: () => (
          <div title={nodeConfig.data.mtim}>
            {moment(nodeConfig.data.mtim).fromNow()}
          </div>
        ),
      },
    };

    const link = '/blockexplorer/accounts';
    const accountMobileColumns = {
      id: this.context.intl.formatMessage(messages.accountColumnId),
      balance: this.context.intl.formatMessage(messages.accountBalance),
      status: this.context.intl.formatMessage(messages.accountStatus),
    };

    const accountColumns = {
      ...accountMobileColumns,
      public_key: this.context.intl.formatMessage(messages.accountPublicKey),
    };

    const accountTab = {
      id: 'account',
      name: this.context.intl.formatMessage(messages.accountTabTitle),
      data: this.props.accounts.data,
      columns: breakpointIsMobile(this.props.breakpoint.size)
        ? accountMobileColumns
        : accountColumns,
      ceilConfiguration: {
        id: value => <Link to={`${link}/${value}`}>{value}</Link>,
      },
    };

    const ceilConfiguration = {
      id: value => (
        <Link to={`/blockexplorer/nodes/${id}/accounts/${value}`}>{value}</Link>
      ),
      status: value => <StatusTableCell value={value} />,
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

    return (
      <NodePageWrapper>
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
          fields={nodeConfig.columns}
          data={node.data}
          loading={node.loading}
          error={node.error}
          breakpoint={breakpoint}
          ceilConfiguration={nodeConfig.ceilConfiguration}
        />
        <h4>
          <FormattedMessage {...messages.accountTabTitle} />
        </h4>
        <ListView
          name="accounts"
          urlParams={match.params}
          query={location.search}
          list={accounts}
          columns={accountTab.columns}
          ceilConfiguration={ceilConfiguration}
          sortingColumns={['id']}
          defaultSort="id"
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
