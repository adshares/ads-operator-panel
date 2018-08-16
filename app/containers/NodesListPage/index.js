/**
 *
 * NodesListPage
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
import config from 'config';
import Pagination from 'components/Pagination/Loadable';
import makeSelectNodesListPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadNodes } from './actions';
import TableDataSet from '../../components/TableDataSet';
import ErrorMsg from '../../components/ErrorMsg';

/* eslint-disable react/prefer-stateless-function */
export class NodesListPage extends React.Component {
  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    const page = params.page || 1;

    this.props.dispatch(
      loadNodes(
        config.limit + 1,
        (page - 1) * config.limit,
        params.sort || 'id',
        params.order || 'desc',
      ),
    );
  }

  componentDidUpdate(nextProps) {
    const {
      match: { params },
    } = nextProps;

    const paramsFromProps = this.props.match.params;

    if (
      paramsFromProps.page !== params.page ||
      paramsFromProps.sort !== params.sort ||
      paramsFromProps.order !== params.order
    ) {
      this.props.onPageChange(
        paramsFromProps.page,
        paramsFromProps.sort,
        paramsFromProps.order,
      );
    }
  }

  render() {
    const columns = {
      id: <FormattedMessage {...messages.fieldId} />,
      account_count: <FormattedMessage {...messages.fieldAccountCount} />,
      msid: <FormattedMessage {...messages.fieldMsid} />,
      balance: <FormattedMessage {...messages.fieldBalance} />,
      status: <FormattedMessage {...messages.fieldStatus} />,
    };
    const link = '/blockexplorer/nodes';
    const sortingColumns = ['id', 'msid'];
    const ceilConfiguration = {
      id: value => <Link to={`${link}/${value}`}>{value}</Link>,
    };

    const {
      match: { params },
    } = this.props;

    const page = parseInt(params.page || 1, 10);
    const sort = params.sort || 'id';
    const order = params.order || 'desc';

    if (sort !== 'id' && sort !== 'msid') {
      return (
        <ErrorMsg error={this.context.intl.formatMessage(messages.sorting)} />
      );
    }

    if (order !== 'desc' && order !== 'asc') {
      return (
        <ErrorMsg error={this.context.intl.formatMessage(messages.ordering)} />
      );
    }

    return (
      <div>
        <Helmet>
          <title>{this.context.intl.formatMessage(messages.metaTitle)}</title>
          <meta
            name="description"
            content={this.context.intl.formatMessage(messages.metaDescription)}
          />
        </Helmet>
        <TableDataSet
          name="nodes"
          columns={columns}
          link={link}
          sortingColumns={sortingColumns}
          sortBy={sort}
          orderBy={order}
          ceilConfiguration={ceilConfiguration}
          data={
            this.props.nodes.data.length > config.limit
              ? this.props.nodes.data.slice(0, -1)
              : this.props.nodes.data
          }
          loading={this.props.nodes.loading}
          error={this.props.nodes.error}
        />
        <Pagination
          link={link}
          page={page}
          sort={sort}
          order={order}
          nextPage={this.props.nodes.data.length > config.limit}
        />
      </div>
    );
  }
}

NodesListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  nodes: PropTypes.object,
  onPageChange: PropTypes.func,
};

NodesListPage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  nodes: makeSelectNodesListPage(),
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
