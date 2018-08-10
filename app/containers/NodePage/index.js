/**
 *
 * NodePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FaAlignJustify, FaCode } from 'react-icons/fa';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import DetailView from 'components/DetailView';
import makeSelectNodePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadNode } from './actions';
import LatestPanel from '../../components/LatestPanel';

/* eslint-disable react/prefer-stateless-function */
export class NodePage extends React.PureComponent {
  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    if (params.id) {
      this.props.dispatch(loadNode(params.id));
    }
  }

  render() {
    const fields = {
      id: 'Id',
      account_count: 'Accounts',
      msid: 'Messages count',
      balance: 'Balance',
      status: 'Status',
    };

    const detailTab = {
      id: 'table',
      name: 'Table',
      icon: <FaAlignJustify />,
    };

    const codeTab = {
      id: 'code',
      name: 'Code',
      icon: <FaCode />,
    };

    const tabs = [detailTab, codeTab];

    const accountColumns = {
      id: 'Account Id',
      balance: 'Balance',
    };

    const accountTab = {
      id: 'account',
      name: 'Accounts',
      data: [],
      columns: accountColumns,
    };

    const {
      match: { params },
    } = this.props;

    return (
      <div>
        <Helmet>
          <title>NodePage</title>
          <meta name="description" content="Description of NodePage" />
        </Helmet>
        <h3>Node #{params.id}</h3>
        <DetailView
          tabs={tabs}
          fields={fields}
          data={this.props.node.data}
          loading={this.props.node.loading}
          error={this.props.node.error}
        />
        <div className="row">
          <LatestPanel tabs={[accountTab]} loading={false} error={false} />
        </div>
      </div>
    );
  }
}

NodePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  node: PropTypes.object,
  accounts: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  node: makeSelectNodePage(),
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
