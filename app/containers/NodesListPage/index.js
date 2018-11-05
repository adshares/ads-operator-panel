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
import { Link } from 'react-router-dom';
import ListView from 'components/organisms/ListView';
import makeSelectNodesListPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadNodes } from './actions';
import StatusTableCell from '../../components/molecules/Table/IconCells/StatusTableCell';
import { breakpointIsMobile } from '../../utils/responsiveHelpers';

/* eslint-disable react/prefer-stateless-function */
export class NodesListPage extends React.Component {
  render() {
    const isMobile = breakpointIsMobile(this.props.breakpoint.size);

    const columnsMobile = {
      id: <FormattedMessage {...messages.fieldId} />,
      balance: <FormattedMessage {...messages.fieldBalance} />,
      status: <FormattedMessage {...messages.fieldStatus} />,
    };

    const columnsDesktop = {
      id: <FormattedMessage {...messages.fieldId} />,
      account_count: <FormattedMessage {...messages.fieldAccountCount} />,
      msid: <FormattedMessage {...messages.fieldMsid} />,
      balance: <FormattedMessage {...messages.fieldBalance} />,
      status: <FormattedMessage {...messages.fieldStatus} />,
      version: <FormattedMessage {...messages.fieldVersion} />,
    };

    const columns = isMobile ? columnsMobile : columnsDesktop;

    const ceilConfiguration = {
      id: value => <Link to={`/blockexplorer/nodes/${value}`}>{value}</Link>,
      status: value => <StatusTableCell value={value} />,
    };

    const sortingColumns = ['id', 'version'];
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
        <h1>{messages.header.defaultMessage}</h1>
        <ListView
          name="nodes"
          urlParams={match.params}
          query={location.search}
          list={nodes}
          columns={columns}
          sortingColumns={sortingColumns}
          ceilConfiguration={ceilConfiguration}
          defaultSort="id"
          messages={messages}
          link="/blockexplorer/nodes"
          onPageChange={onPageChange}
          tableMinWidth={config.tablesMinWidth.tableXs}
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
