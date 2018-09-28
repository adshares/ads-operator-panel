/**
 *
 * NodePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
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

    const fields = {
      id: <FormattedMessage {...messages.fieldId} />,
      account_count: <FormattedMessage {...messages.fieldAccountCount} />,
      msid: <FormattedMessage {...messages.fieldMsid} />,
      balance: <FormattedMessage {...messages.fieldBalance} />,
      status: <FormattedMessage {...messages.fieldStatus} />,
      ipv4: <FormattedMessage {...messages.fieldIp} />,
      public_key: <FormattedMessage {...messages.fieldPublicKey} />,
      mtim: <FormattedMessage {...messages.fieldMtim} />,
    };

    const link = '/blockexplorer/accounts';
    const accountTab = {
      id: 'account',
      name: this.context.intl.formatMessage(messages.accountTabTitle),
      data: this.props.accounts.data,
      columns: {
        id: this.context.intl.formatMessage(messages.accountColumnId),
        balance: this.context.intl.formatMessage(messages.accountBalance),
        status: this.context.intl.formatMessage(messages.accountStatus),
        public_key: this.context.intl.formatMessage(messages.accountPublicKey),
      },
      ceilConfiguration: {
        id: value => <Link to={`${link}/${value}`}>{value}</Link>,
      },
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
          fields={fields}
          data={node.data}
          loading={node.loading}
          error={node.error}
          breakpoint={breakpoint}
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
          sortingColumns={['id']}
          defaultSort="id"
          messages={messages}
          link={`/blockexplorer/nodes/${id}/accounts`}
          onPageChange={onPageChange}
          breakpoint={breakpoint}
          tableMinWidth={config.tablesMinWidth.tableLg}
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
