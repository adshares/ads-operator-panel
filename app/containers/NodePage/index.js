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
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import DetailView from 'components/DetailView';
import { makeSelectAccounts, makeSelectNode } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadAccounts, loadNode } from './actions';
import { NodePageWrapper } from './styled';
import LatestPanel from '../../components/LatestPanel';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class NodePage extends React.PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      this.props.dispatch(loadNode(id));
      this.props.dispatch(loadAccounts(id));
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
    };

    const link = '/blockexplorer/accounts';
    const accountTab = {
      id: 'account',
      name: this.context.intl.formatMessage(messages.accountTabTitle),
      data: this.props.accounts.data,
      columns: {
        id: this.context.intl.formatMessage(messages.accountColumnId),
        balance: this.context.intl.formatMessage(messages.accountBalance),
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
          data={this.props.node.data}
          loading={this.props.node.loading}
          error={this.props.node.error}
        />
        <div className="row">
          <LatestPanel
            tabs={[accountTab]}
            loading={this.props.accounts.loading}
            error={this.props.accounts.error}
          />
        </div>
      </NodePageWrapper>
    );
  }
}

NodePage.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  node: PropTypes.object,
  accounts: PropTypes.object,
};

NodePage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  node: makeSelectNode(),
  accounts: makeSelectAccounts(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
