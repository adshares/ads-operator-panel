/**
 *
 * NodesListPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage, intlShape } from 'react-intl';
import { Helmet } from 'react-helmet';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import config from 'config';
import ListView from 'components/organisms/ListView';
import makeSelectNodesListPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadNodes } from './actions';
import { Title } from '../../components/atoms/Title';

/* eslint-disable react/prefer-stateless-function */
export class NodesListPage extends React.Component {
  render() {
    const columns = {
      id: <FormattedMessage {...messages.fieldId} />,
      account_count: <FormattedMessage {...messages.fieldAccountCount} />,
      msid: <FormattedMessage {...messages.fieldMsid} />,
      balance: <FormattedMessage {...messages.fieldBalance} />,
      status: <FormattedMessage {...messages.fieldStatus} />,
    };
    const sortingColumns = ['id'];
    const { match, location, nodes, onPageChange, breakpoint } = this.props;
    return (
      <div>
        <Helmet>
          <title>{this.context.intl.formatMessage(messages.metaTitle)}</title>
          <meta
            name="description"
            content={this.context.intl.formatMessage(messages.metaDescription)}
          />
        </Helmet>
        <Title>{messages.header.defaultMessage}</Title>
        <ListView
          name="nodes"
          urlParams={match.params}
          query={location.search}
          list={nodes}
          columns={columns}
          sortingColumns={sortingColumns}
          defaultSort="id"
          messages={messages}
          link="/blockexplorer/nodes"
          onPageChange={onPageChange}
          tableMinWidth={config.tablesMinWidth.tableMd}
          breakpoint={breakpoint}
        />
      </div>
    );
  }
}

NodesListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  location: PropTypes.object,
  nodes: PropTypes.object,
  onPageChange: PropTypes.func,
  breakpoint: PropTypes.object,
};

NodesListPage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  nodes: makeSelectNodesListPage(),
  breakpoint: state => state.get('breakpoint'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onPageChange: (page, sort, order) => {
      const offset = (page - 1) * config.limit;
      return dispatch(loadNodes(config.limit + 1, offset, sort, order));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'nodesListPage', reducer });
const withSaga = injectSaga({ key: 'nodesListPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NodesListPage);
